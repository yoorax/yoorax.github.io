/* =========================================================
   Experience Data — From Master CV + JIDE CV
   ========================================================= */

const experienceData = [
  {
    id: 'ocp-group',
    title: 'Data Systems & Industrial Automation Engineer',
    company: 'OCP Group',
    companyShort: 'OCP',
    location: 'Safi, Morocco',
    type: 'On-site',
    jobType: 'End-of-Study Internship (PFE)',
    startDate: 'March 2025',
    endDate: 'July 2025',
    duration: '5 months',
    description: 'Designed and deployed a comprehensive performance monitoring and traceability system for the MCP product bagging and production line. This project bridged the gap between Operational Technology (OT) and Information Technology (IT), creating a fully integrated digital ecosystem that centralized 100% of quality data with real-time access. The system eliminated over 14 hours per week of manual data entry through automated Excel VBA forms and built an automated data pipeline from Siemens PLC (OPC-UA / TIA Portal) to SQL Server using Node-RED. Using Pareto analysis through Power BI dashboards, identified 4 root causes responsible for 80% of production defects. Led training of 5+ technicians ensuring complete adoption of the digital system while maintaining HSE compliance through formal training and team awareness initiatives.',
    responsibilities: [
      'Designed centralized SQL Server database architecture with stored procedures for automated KPI calculations',
      'Built automated data pipeline from Siemens PLC (OPC-UA / TIA Portal) to SQL Server using Node-RED',
      'Developed Excel VBA user interface for automated data collection, saving 14+ hours/week',
      'Created dynamic Power BI dashboard with Pareto analysis for real-time defect trend analysis',
      'Established early diagnostic approaches using data-driven methods for predictive maintenance',
      'Trained and supervised 6+ technicians and administrative staff on system operations',
      'Led coordination with international subcontractors ("PAYPER") and multi-disciplinary teams',
      'Ensured HSE compliance through formal training and team awareness initiatives'
    ],
    skills: ['SQL Server', 'Power BI', 'Excel VBA', 'Node-RED', 'OPC-UA', 'TIA Portal', 'Siemens PLC', 'SCADA', 'MQTT', 'KPI Analysis', 'Pareto Analysis', 'HSE', 'Team Training']
  },
  {
    id: 'alten-group',
    title: 'R&D Mechanical Design Engineer',
    company: 'ALTEN Group',
    companyShort: 'ALTEN',
    location: 'Technopolis, Rabat, Morocco',
    type: 'On-site',
    jobType: 'Applied Internship (PFA)',
    startDate: 'August 2024',
    endDate: 'November 2024',
    duration: '4 months',
    description: 'Independently researched and developed innovative foldable stacking rack mechanisms for ALSTOM railway component packaging at ALTEN Group. Designed and simulated safety verification processes using SolidWorks and CATIA V5, achieving a 92.8% space optimization ratio, reducing logistics costs by 87.56%, and improving return cycle time by 65.9%. Engineered an automated Python script to dynamically generate custom inner-part dimensions based on outer Stacking Rack variables using parametric equations to instantly scale internal architecture. Performed structural simulation and FEA analysis for packaging safety compliance, and collaborated actively with international stakeholders presenting design concepts to clients.',
    responsibilities: [
      'Designed innovative foldable mechanisms optimizing storage space by over 90%',
      'Executed full 3D modeling and 2D technical drawings using CATIA V5 and SolidWorks',
      'Engineered automated Python script for parametric dimension generation',
      'Conducted data-driven KPI analysis using Python to validate engineering decisions',
      'Performed structural simulation and FEA for packaging safety compliance',
      'Converted non-editable STP assembly files into editable designs via reverse engineering in CATIA',
      'Applied failure analysis and constraint optimization techniques',
      'Collaborated with international stakeholders and presented design concepts to clients'
    ],
    skills: ['CATIA V5', 'SolidWorks', 'Fusion 360', 'Python', 'FEA', 'Reverse Engineering', '3D Modeling', '2D Drawings', 'ALSTOM', 'Parametric Design']
  },
  {
    id: 'local-workshop',
    title: 'Operator Assistant — Production Machines',
    company: 'Local Industrial Workshop',
    companyShort: 'Workshop',
    location: 'Chtouka Aït Baha, Morocco',
    type: 'On-site',
    jobType: 'Operational Experience',
    startDate: 'September 2025',
    endDate: 'November 2025',
    duration: '3 months',
    description: 'Gained hands-on operational experience working directly with production machinery in an industrial workshop environment. Assisted in the operation of shredders, dryers, coal briquette presses, conveyors, and packaging machines. Conducted process optimization studies, analyzing workflow bottlenecks and proposing improvement recommendations to enhance production efficiency and reduce material waste.',
    responsibilities: [
      'Assisted operation of shredders, dryers, coal briquette presses, conveyors, and packaging machines',
      'Conducted process optimization study and analysis',
      'Proposed improvement recommendations for production efficiency',
      'Gained hands-on understanding of industrial production workflows'
    ],
    skills: ['Process Optimization', 'Production Machinery', 'Industrial Operations', 'Lean Manufacturing', 'Workflow Analysis']
  }
];

export default experienceData;
