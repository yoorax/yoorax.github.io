/* =========================================================
   Projects Data — Extracted from Master CV Academic Projects
   ========================================================= */

const projectsData = [
  {
    id: 'robotics',
    category: 'Robotics & Control Systems',
    description: 'Design, simulation, and control of robotic systems',
    projects: [
      {
        id: 'robot-arm-optimization',
        name: 'Robot Arm Design Optimization',
        description: 'Enhanced articulated robot arms using topology optimization and AI-powered generative design. Leveraged advanced computational methods to reduce material usage while maintaining structural integrity and range of motion.',
        tools: ['SolidWorks', 'Fusion 360', 'AI Generative Design'],
        category: 'Robotics'
      },
      {
        id: 'delta-robot-sorting',
        name: 'Delta Robot for Waste Sorting',
        description: 'Designed and animated a delta robot for intelligent waste sorting applications. The system uses computer vision to identify and classify waste items, enabling automated separation for recycling processes.',
        tools: ['SolidWorks', 'Animation', 'Waste Management'],
        category: 'Robotics'
      },
      {
        id: '3r-robot-control',
        name: '3R Robot Design & Motion Control',
        description: 'Modeled and simulated a 3-revolute joint robotic arm with full motion control. Implemented forward and inverse kinematics algorithms for precise end-effector positioning.',
        tools: ['SolidWorks', 'MATLAB', 'Simulink'],
        category: 'Robotics'
      },
      {
        id: 'helicopter-control',
        name: '2DOF Helicopter Control Prototype',
        description: 'Implemented LQR and LQG control strategies for a two-degree-of-freedom helicopter prototype. Designed state-space models and tuned controller gains for optimal stability and tracking performance.',
        tools: ['MATLAB', 'Simulink', 'LQR', 'LQG'],
        category: 'Robotics'
      },
      {
        id: 'line-following-robot',
        name: 'Line-Following Robot with PID Control',
        description: 'Designed, built, and tuned a line-following robot from scratch using Arduino Uno. Implemented a PID controller for smooth path tracking with infrared sensors for line detection.',
        tools: ['Arduino Uno', 'PID Control', 'C++', 'Electronics'],
        category: 'Robotics'
      }
    ]
  },
  {
    id: 'industrial-automation',
    category: 'Industrial Automation & IIoT',
    description: 'PLC programming, SCADA systems, and industrial data pipelines',
    projects: [
      {
        id: 'ocp-data-system',
        name: 'OCP Performance Monitoring System',
        description: 'Designed and deployed a comprehensive performance monitoring and traceability system for MCP product bagging and production line at OCP Group. Built automated data pipeline from Siemens PLC (OPC-UA / TIA Portal) to SQL Server using Node-RED. Centralized 100% of quality data with real-time access via SQL Server and Power BI dashboards. Identified 4 root causes responsible for 80% of production defects using Pareto analysis.',
        tools: ['SQL Server', 'Power BI', 'Excel VBA', 'Node-RED', 'OPC-UA', 'TIA Portal', 'Siemens PLC'],
        category: 'Industrial Automation'
      },
      {
        id: 'vertical-farm',
        name: 'Autonomous Vertical Farm Prototype',
        description: 'Designed and automated an autonomous vertical farm prototype integrating Artificial Intelligence for environmental control. The system monitors temperature, humidity, and light levels to optimize plant growth conditions automatically.',
        tools: ['Arduino', 'ESP32', 'AI', 'Sensors', 'Automation'],
        category: 'Industrial Automation'
      },
      {
        id: 'pet-recycling-machine',
        name: 'PET Bottle Recycling Machine',
        description: 'Engineered a PET bottle recycling machine for 3D printing filament production. The system shreds, melts, and extrudes PET plastic into usable 3D printing filament, promoting circular economy principles.',
        tools: ['Mechanical Design', '3D Printing', 'Recycling', 'SolidWorks'],
        category: 'Industrial Automation'
      }
    ]
  },
  {
    id: 'ai-data',
    category: 'Artificial Intelligence & Data Analysis',
    description: 'Machine learning models, computer vision, and predictive analytics',
    projects: [
      {
        id: 'mask-detection-cnn',
        name: 'Facial Mask Detection (CNN)',
        description: 'Developed a real-time facial mask recognition model using convolutional neural networks in Python. Achieved high accuracy in detecting masked vs. unmasked faces in live video streams.',
        tools: ['Python', 'TensorFlow', 'CNN', 'Deep Learning'],
        category: 'AI & Data'
      },
      {
        id: 'mask-detection-yolo',
        name: 'Real-Time Mask Detection (YOLOv8)',
        description: 'Created a real-time detection and recognition system using YOLOv8 object detection with OpenCV and Roboflow for dataset management. Optimized for low-latency inference on live camera feeds.',
        tools: ['OpenCV', 'YOLOv8', 'Roboflow', 'Python'],
        category: 'AI & Data'
      },
      {
        id: 'time-series-forecasting',
        name: 'Stock Market & Weather Prediction',
        description: 'Built time series forecasting models using ARIMA for both stock market price prediction and weather pattern analysis. Performed feature engineering, stationarity testing, and hyperparameter optimization.',
        tools: ['Python', 'ARIMA', 'Pandas', 'Matplotlib'],
        category: 'AI & Data'
      },
      {
        id: 'predictive-modeling',
        name: 'Predictive Modeling Suite',
        description: 'Developed machine learning models including KNN, linear and logistic regression, and random forest classifiers. Applied cross-validation, feature selection, and performance metric analysis.',
        tools: ['Scikit-learn', 'Python', 'KNN', 'Random Forest'],
        category: 'AI & Data'
      },
      {
        id: 'flight-price-prediction',
        name: 'Flight Price Prediction',
        description: 'Built a comprehensive machine learning pipeline for flight price prediction using Random Forest and XGBoost regressors. Included data cleaning, feature engineering, model evaluation with MAE/RMSE/R², and hyperparameter tuning.',
        tools: ['Python', 'XGBoost', 'Random Forest', 'Pandas', 'Scikit-learn'],
        category: 'AI & Data'
      }
    ]
  },
  {
    id: 'mechanical-cad',
    category: 'Mechanical Design & CAD',
    description: '3D modeling, FEA simulation, and manufacturing',
    projects: [
      {
        id: 'alten-foldable-rack',
        name: 'ALSTOM Foldable Stacking Rack',
        description: 'Developed innovative foldable stacking rack mechanisms for ALSTOM railway packaging at ALTEN Group. Engineered an automated Python script to dynamically generate custom inner-part dimensions based on outer Stacking Rack variables. Achieved a 92.8% space optimization ratio, reduced logistics costs by 87.56%, and improved return cycle time by 65.9%.',
        tools: ['CATIA V5', 'SolidWorks', 'Fusion 360', 'Python', 'FEA'],
        category: 'Mechanical Design'
      },
      {
        id: 'cnc-machining',
        name: 'CNC Machining Project',
        description: 'Designed and manufactured a mechanical part with complete setup and simulation in CATIA. Included toolpath generation, machining parameter optimization, and quality verification of the final manufactured component.',
        tools: ['CATIA V5', 'CNC', 'G-Code', 'Manufacturing'],
        category: 'Mechanical Design'
      },
      {
        id: 'bicycle-frame',
        name: 'Bicycle Frame Optimization',
        description: 'Modeled and optimized bicycle frame geometry using Autodesk Fusion 360. Applied topology optimization to minimize weight while maintaining structural requirements under various loading conditions.',
        tools: ['Fusion 360', 'Topology Optimization', 'FEA'],
        category: 'Mechanical Design'
      },
      {
        id: 'static-analysis',
        name: 'Static Structural Analysis',
        description: 'Conducted comprehensive stress and deformation analyses of mechanical parts under various loading conditions. Generated detailed reports on safety factors, von Mises stress, and displacement fields.',
        tools: ['SolidWorks', 'Fusion 360', 'FEA', 'Static Analysis'],
        category: 'Mechanical Design'
      },
      {
        id: 'beam-simulation',
        name: 'Beam Simulation under Load',
        description: 'Analyzed mechanical behavior of beam structures using Abaqus FEA software. Studied bending, shear, and deflection characteristics under various loading and boundary conditions.',
        tools: ['Abaqus', 'FEA', 'Structural Analysis'],
        category: 'Mechanical Design'
      },
      {
        id: 'multi-source-energy',
        name: 'Multi-Source Energy System',
        description: 'Studied and modeled a multi-source energy system coupling wind, wave, hydraulic, and photovoltaic generation. Analyzed energy output optimization and integration strategies for renewable energy sources.',
        tools: ['MATLAB', 'Energy Systems', 'Renewable Energy', 'Modeling'],
        category: 'Mechanical Design'
      }
    ]
  }
];

export default projectsData;
