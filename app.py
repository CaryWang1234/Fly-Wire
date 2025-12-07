#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
飞线(FlyWire)社交平台主应用 - 简化版本
"""

import os
import uuid
import json
from datetime import datetime
from flask import Flask, render_template, request, jsonify, session, redirect, url_for

# 创建Flask应用
app = Flask(__name__)
app.config['SECRET_KEY'] = 'flywire_secret_key_2024'
app.config['JSON_AS_ASCII'] = False  # 确保JSON支持中文

# 存储飞线数据
wires = {}

# 用户类
class User:
    def __init__(self, user_id, username):
        self.id = user_id
        self.username = username
        self.joined_at = datetime.now()

# 飞线类
class Wire:
    def __init__(self, wire_id, title, creator):
        self.id = wire_id
        self.title = title
        self.creator = creator
        self.created_at = datetime.now()
        self.messages = []
        self.participants = {creator.id: creator}

    def add_message(self, user, content):
        message = {
            'id': str(uuid.uuid4()),
            'user': user.username,
            'content': content,
            'timestamp': datetime.now().strftime('%H:%M:%S')
        }
        self.messages.append(message)
        return message

    def add_participant(self, user):
        if user.id not in self.participants:
            self.participants[user.id] = user

# 路由定义
@app.route('/')
def index():
    """首页"""
    return render_template('index.html', wires=wires)

@app.route('/create', methods=['POST'])
def create_wire():
    """创建飞线"""
    data = request.get_json()
    title = data.get('title', '').strip()
    username = data.get('username', '').strip()
    
    if not title or not username:
        return jsonify({'error': '标题和用户名不能为空'}), 400
    
    # 生成唯一ID
    wire_id = str(uuid.uuid4())
    user_id = str(uuid.uuid4())
    
    # 创建用户和飞线
    user = User(user_id, username)
    wire = Wire(wire_id, title, user)
    
    # 存储飞线
    wires[wire_id] = wire
    
    # 设置用户会话
    session['user_id'] = user_id
    session['username'] = username
    session['current_wire'] = wire_id
    
    return jsonify({
        'wire_id': wire_id,
        'user_id': user_id,
        'title': title
    })

@app.route('/wire/<wire_id>')
def wire_page(wire_id):
    """飞线页面"""
    wire = wires.get(wire_id)
    if not wire:
        return "飞线不存在", 404
    
    return render_template('wire.html', wire=wire)

@app.route('/wire/<wire_id>/join', methods=['POST'])
def join_wire(wire_id):
    """加入飞线"""
    wire = wires.get(wire_id)
    if not wire:
        return jsonify({'error': '飞线不存在'}), 404
    
    data = request.get_json()
    username = data.get('username', '').strip()
    
    if not username:
        return jsonify({'error': '用户名不能为空'}), 400
    
    # 创建用户
    user_id = str(uuid.uuid4())
    user = User(user_id, username)
    
    # 加入飞线
    wire.add_participant(user)
    
    # 设置用户会话
    session['user_id'] = user_id
    session['username'] = username
    session['current_wire'] = wire_id
    
    return jsonify({
        'wire_id': wire_id,
        'user_id': user_id,
        'title': wire.title
    })

@app.route('/wire/<wire_id>/messages', methods=['GET', 'POST'])
def wire_messages(wire_id):
    """获取或发送消息"""
    wire = wires.get(wire_id)
    if not wire:
        return jsonify({'error': '飞线不存在'}), 404
    
    if request.method == 'GET':
        # 获取消息列表
        return jsonify(wire.messages)
    
    elif request.method == 'POST':
        # 发送消息
        data = request.get_json()
        content = data.get('content', '').strip()
        username = data.get('username', '')
        
        if not content:
            return jsonify({'error': '消息内容不能为空'}), 400
        
        # 查找用户
        user = None
        for participant in wire.participants.values():
            if participant.username == username:
                user = participant
                break
        
        if not user:
            return jsonify({'error': '用户不存在'}), 404
        
        # 添加消息
        message = wire.add_message(user, content)
        
        return jsonify(message)

@app.route('/api/wires')
def get_wires():
    """获取所有飞线列表"""
    wires_list = []
    for wire_id, wire in wires.items():
        wires_list.append({
            'id': wire_id,
            'title': wire.title,
            'creator': wire.creator.username,
            'participant_count': len(wire.participants),
            'message_count': len(wire.messages),
            'created_at': wire.created_at.strftime('%Y-%m-%d %H:%M:%S')
        })
    
    return jsonify(wires_list)

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)