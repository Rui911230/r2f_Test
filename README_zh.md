[English](README.md) | **中文**

# AeroFlutter 多智能体桥接系统 (Multi-Agent Bridge)

## 项目简介

AeroFlutter 是一个实验性的多智能体桥接系统，旨在通过视觉驱动的反馈循环，自动将 React 的 UI 和逻辑转换为高保真的 Flutter 代码。该项目协调了多个 AI 智能体来解析源代码、生成转换代码，并通过 Android 调试桥 (ADB) 在真实或模拟设备上对生成的应用进行视觉对比分析。

### 多智能体架构

系统采用结构化的状态机工作流（`INIT` -> `BUILD` -> `SENSE` -> `COMPARE` -> `SUCCESS`），由以下专门的 AI 角色驱动：

- **CEO 智能体 (Claude-3.5-Sonnet):** 担任战略指挥官，负责编排整个工作流，并决定转换结果的视觉相似度何时达到 > 95% 的成功阈值。
- **源码审计员 (Claude-3.5-Sonnet):** 担任逻辑分析师，负责解析 React 源文件 (`.tsx`/`.css`)，提取样式变量、Flexbox 布局逻辑和函数式 Hooks。
- **视觉侦察员 (MiniMax-6-Vision):** 担任感知引擎，负责执行 ADB 命令以捕获实时 UI 视觉画面，并提取 UI 结构（例如 Paperclip AI DSL）。
- **Flutter 架构师 (Claude-3.5-Sonnet):** 担任构建者，负责生成和重构 `.dart` 代码，并处理热重载 (Hot Reload) 触发器。
- **QA 巡检员 (MiniMax-6-Vision):** 担任验证者，负责在 React 开发服务器页面与 Flutter 应用界面之间执行视觉对比分析。

## 使用说明

本项目包含两个主要部分：一个负责编排工作流的 Python 后端脚本，以及一个用于可视化模拟过程的 React 前端仪表盘。

### 前置要求

要运行后端工作流，您必须配置以下环境变量：

```bash
export ANTHROPIC_API_KEY="your-anthropic-api-key"
export ADB_CONNECTION="your-adb-connection-string"
```

### 运行 Python 后端

首先，请确保您已安装所需的 Python 依赖项：

```bash
pip install -r requirements.txt
```

运行后端脚本：

```bash
python aeroflutter.py
```

*注意：如果缺少环境变量，脚本将会暂停并提示您进行输入。*

### 运行可视化仪表盘

可视化界面（Jules Visualization Panel）使用 React 和 Vite 构建。它模拟并展示了工作流状态、视觉相似度趋势和智能体日志。

1. 进入 `frontend` 目录：
   ```bash
   cd frontend
   ```
2. 安装 Node.js 依赖项（如果您尚未安装）：
   ```bash
   npm install
   ```
   > **故障排除:** 如果您遇到诸如 `Cannot find native binding...` 类的原生绑定错误，或者与 `rolldown` 和可选依赖项相关的问题（这是一个已知的跨平台 `npm` 错误），请运行以下命令清理模块并重新安装：
   > ```bash
   > rm -rf node_modules package-lock.json && npm install
   > ```

3. 启动开发服务器：
   ```bash
   npm run dev
   ```
4. 在浏览器中打开提供的本地 URL（通常是 `http://localhost:5173/`）查看仪表盘，然后点击 **"Start Workflow Simulation"** 观看多智能体系统的实时模拟。
