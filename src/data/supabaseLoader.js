import React from 'react';
import { 
  FiCpu, FiDatabase, FiTerminal, FiSettings, FiCode, 
  FiActivity, FiBarChart2, FiGithub, FiVideo, FiLayers 
} from 'react-icons/fi';
import { supabase } from '../supabaseClient';
import projectsBackup from './projects';
import { academicData as academicBackup, bootcampData as bootcampBackup, certificationData as certsBackup } from './education';
import experienceBackup from './experience';
import activitiesBackup from './activities';

// List of softwares and technologies to distinguish from concepts
export const softwareList = [
  'solidworks', 'catia v5', 'catia', 'fusion 360', 'matlab', 'simulink', 
  'arduino', 'arduino uno', 'esp32', 'python', 'tensorflow', 'opencv', 
  'power bi', 'sql server', 'node-red', 'postgresql', 'postgres', 
  'autocad', 'git', 'github', 'pandas', 'scikit-learn', 'excel vba', 
  'vba', 'c++', 'g-code', 'abaqus', 'ansys', 'tableau', 'sensors', 
  'electronics', 'cnn', 'yolov8', 'roboflow', 'arima', 'xgboost', 'random forest'
];

// Mapped stable Feather icons for technologies
const techIconMap = {
  'solidworks': <FiSettings />,
  'catia v5': <FiSettings />,
  'catia': <FiSettings />,
  'fusion 360': <FiSettings />,
  'matlab': <FiTerminal />,
  'simulink': <FiSettings />,
  'arduino': <FiCpu />,
  'arduino uno': <FiCpu />,
  'esp32': <FiCpu />,
  'python': <FiTerminal />,
  'tensorflow': <FiLayers />,
  'opencv': <FiVideo />,
  'power bi': <FiBarChart2 />,
  'sql server': <FiDatabase />,
  'node-red': <FiActivity />,
  'postgresql': <FiDatabase />,
  'postgres': <FiDatabase />,
  'autocad': <FiSettings />,
  'git': <FiGithub />,
  'github': <FiGithub />,
  'pandas': <FiCode />,
  'scikit-learn': <FiCode />,
  'excel vba': <FiDatabase />,
  'vba': <FiDatabase />,
  'c++': <FiTerminal />,
  'g-code': <FiTerminal />,
  'abaqus': <FiSettings />,
  'ansys': <FiSettings />,
  'tableau': <FiBarChart2 />,
  'sensors': <FiCpu />,
  'electronics': <FiCpu />,
  'cnn': <FiLayers />,
  'yolov8': <FiVideo />,
  'roboflow': <FiVideo />,
  'arima': <FiTerminal />,
  'xgboost': <FiCode />,
  'random forest': <FiCode />
};

// Helper: Get Icon for Technology name (Feather fallback)
export function getTechIcon(techName) {
  if (!techName) return <FiSettings />;
  const normalized = techName.toLowerCase().trim();
  return techIconMap[normalized] || <FiCpu />;
}

// Helper: Get technology icons lookup map from Supabase
export async function getTechnologyIconsMap() {
  const fallbackIcons = {};
  if (!supabase) return fallbackIcons;
  try {
    const { data, error } = await supabase
      .from('technology_icons')
      .select('id, icon_link');

    if (error) throw error;

    const map = {};
    data.forEach(item => {
      map[item.id] = item.icon_link;
    });

    localStorage.setItem('portfolio_tech_icons_map', JSON.stringify(map));
    return map;
  } catch (error) {
    console.error('Error fetching technology icons map:', error);
    const cached = localStorage.getItem('portfolio_tech_icons_map');
    return cached ? JSON.parse(cached) : fallbackIcons;
  }
}

// Helper: Get detailed technology icons map (id -> { name, icon })
export async function getTechnologyDetailsMap() {
  const fallbackDetails = {};
  if (!supabase) return fallbackDetails;
  try {
    const { data, error } = await supabase
      .from('technology_icons')
      .select('id, software_name, icon_link');

    if (error) throw error;

    const map = {};
    data.forEach(item => {
      let logoUrl = item.icon_link;
      // Dynamic rewrite fallback for legacy paths
      if (logoUrl && logoUrl.includes('/technologies/') && !logoUrl.includes('/technologies_icons/')) {
        logoUrl = logoUrl.replace('/technologies/', '/technologies_icons/');
      }
      map[item.id] = {
        name: item.software_name,
        icon: logoUrl
      };
    });

    localStorage.setItem('portfolio_tech_details_map', JSON.stringify(map));
    return map;
  } catch (error) {
    console.error('Error fetching technology details map:', error);
    const cached = localStorage.getItem('portfolio_tech_details_map');
    return cached ? JSON.parse(cached) : fallbackDetails;
  }
}

// Helper: Format YYYY-MM to readable Date "Month Year" (e.g. "2026-01" -> "Jan 2026")
export function formatMonthYear(dateStr) {
  if (!dateStr) return 'Present';
  if (dateStr.toLowerCase() === 'present') return 'Present';
  const parts = dateStr.split('-');
  if (parts.length < 2) return dateStr;
  const [year, month] = parts;
  const monthNames = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'June',
    'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'
  ];
  const monthIdx = parseInt(month, 10) - 1;
  if (monthIdx >= 0 && monthIdx < 12) {
    return `${monthNames[monthIdx]} ${year}`;
  }
  return dateStr;
}

// Helper: Format a date range
export function formatDateRange(start, end) {
  const formattedStart = formatMonthYear(start);
  const formattedEnd = formatMonthYear(end);
  return `${formattedStart} – ${formattedEnd}`;
}

// Group backup certifications into categories for unified UI structure
const fallbackCertCategories = [
  {
    id: 'robotics-automation',
    category: 'Robotics & Industrial Automation',
    description: 'Certifications in PLC programming, HMI, and control systems.',
    certs: [
      { id: 'cert-plc-tia', title: 'Siemens S7-1200 PLC Programming (TIA Portal)', provider: 'Udemy', skills: ['TIA Portal', 'Siemens PLC', 'S7-1200', 'Ladder Logic'], certificateLink: 'https://www.udemy.com/certificate/cert-plc-tia' },
      { id: 'cert-vba', title: 'MS Excel VBA Programming', provider: 'Udemy', skills: ['Excel VBA', 'Automation', 'Macros', 'UserForms'], certificateLink: 'https://www.udemy.com/certificate/cert-vba' },
      { id: 'cert-plc-mnemonic', title: 'PLC TIA Portal Programming – Mnemonic Language', provider: 'Udemy', skills: ['TIA Portal', 'PLC Programming', 'STL', 'Mnemonic'], certificateLink: 'https://www.udemy.com/certificate/cert-plc-mnemonic' }
    ]
  },
  {
    id: 'cad-design',
    category: 'Mechanical Design & CAD',
    description: 'Certifications in 3D modeling and analysis tools.',
    certs: [
      { id: 'cert-catia', title: 'Complete Course in CATIA', provider: 'Udemy', skills: ['CATIA V5', '3D Modeling', 'Assembly Design', 'Drafting'], certificateLink: 'https://www.udemy.com/certificate/cert-catia' },
      { id: 'cert-solidworks', title: 'SolidWorks Industrial Level Certification', provider: 'Udemy', skills: ['SolidWorks', '3D Design', 'Assemblies', 'Simulation'], certificateLink: 'https://www.udemy.com/certificate/cert-solidworks' },
      { id: 'cert-catia-design', title: 'Mechanical Design with CATIA', provider: 'Udemy', skills: ['CATIA V5', 'Mechanical Design', 'Part Design', 'GD&T'], certificateLink: 'https://www.udemy.com/certificate/cert-catia-design' },
      { id: 'cert-solidworks-design', title: 'Mechanical Design with SolidWorks', provider: 'Udemy', skills: ['SolidWorks', 'Part Modeling', 'Weldments', 'Sheet Metal'], certificateLink: 'https://www.udemy.com/certificate/cert-solidworks-design' },
      { id: 'cert-autocad', title: 'AutoCAD 2D & 3D', provider: 'Udemy', skills: ['AutoCAD', '2D Drafting', '3D Modeling', 'Technical Drawing'], certificateLink: 'https://www.udemy.com/certificate/cert-autocad' }
    ]
  },
  {
    id: 'data-science',
    category: 'Data Science & Analysis',
    description: 'Certifications in Python programming and analytics.',
    certs: [
      { id: 'cert-data-science', title: 'Data Science & Machine Learning in Python', provider: 'Udemy', skills: ['Python', 'Machine Learning', 'Scikit-learn', 'Data Science'], certificateLink: 'https://www.udemy.com/certificate/cert-data-science' }
    ]
  },
  {
    id: 'automotive',
    category: 'Automotive Engineering',
    description: 'Certifications in vehicle design and engine thermodynamics.',
    certs: [
      { id: 'cert-ice', title: 'Internal Combustion Engine: Design & Emissions', provider: 'Udemy', skills: ['Engine Design', 'Emissions Control', 'Thermodynamics', 'Automotive'], certificateLink: 'https://www.udemy.com/certificate/cert-ice' }
    ]
  }
];

// Fetch projects grouped by category
export async function getProjects() {
  const mapBackupTechnologies = (tools) => {
    return (tools || []).map(t => ({
      name: t,
      icon: null
    }));
  };

  if (!supabase) {
    // Process local backup: split tools array into concepts and technologies
    return projectsBackup.map(cat => ({
      ...cat,
      projects: cat.projects.map(p => {
        const tools = p.tools || [];
        const technologies = tools.filter(t => softwareList.includes(t.toLowerCase().trim()));
        const concepts = tools.filter(t => !softwareList.includes(t.toLowerCase().trim()));
        return {
          ...p,
          concepts,
          technologies: mapBackupTechnologies(technologies)
        };
      })
    }));
  }

  try {
    const techIconsMap = await getTechnologyIconsMap();

    const { data: categories, error: catError } = await supabase
      .from('project_categories')
      .select('id, category_name, category_description, category_icon, display_order')
      .order('display_order', { ascending: true });

    if (catError) throw catError;

    const { data: projects, error: projError } = await supabase
      .from('projects')
      .select('*')
      .order('display_order', { ascending: true });

    if (projError) throw projError;

    const structuredData = categories.map(cat => ({
      id: cat.id,
      category: cat.category_name,
      description: cat.category_description,
      icon: cat.category_icon,
      projects: projects.filter(p => p.category_id === cat.id).map(p => {
        let concepts = p.concepts || [];
        let rawTech = p.technologies || [];
        
        // Fallback: If concepts and technologies are empty, dynamically split from tools array
        if (concepts.length === 0 && rawTech.length === 0) {
          const tools = p.tools || [];
          rawTech = tools.filter(t => softwareList.includes(t.toLowerCase().trim()));
          concepts = tools.filter(t => !softwareList.includes(t.toLowerCase().trim()));
        }

        // Map technologies to their custom WebP icons or fallback using technologies_icons foreign key array
        const technologies = rawTech.map((techName, idx) => {
          const iconId = p.technologies_icons && p.technologies_icons[idx];
          const iconKey = iconId ? iconId.toLowerCase().replace(/\s+/g, '') : techName.toLowerCase().replace(/\s+/g, '');
          return {
            name: techName,
            icon: techIconsMap[iconKey] || null
          };
        });

        return {
          id: p.id,
          name: p.name,
          brief_description: p.brief_description,
          description: p.description,
          concepts,
          technologies,
          category: p.project_category,
          thumbnail: p.thumbnail,
          project_link: p.project_link,
          link_name: p.link_name
        };
      })
    }));

    localStorage.setItem('portfolio_projects', JSON.stringify(structuredData));
    return structuredData;
  } catch (error) {
    console.error('Error fetching projects from Supabase:', error);
    const cached = localStorage.getItem('portfolio_projects');
    return cached ? JSON.parse(cached) : projectsBackup.map(cat => ({
      ...cat,
      projects: cat.projects.map(p => {
        const tools = p.tools || [];
        const technologies = tools.filter(t => softwareList.includes(t.toLowerCase().trim()));
        const concepts = tools.filter(t => !softwareList.includes(t.toLowerCase().trim()));
        return {
          ...p,
          concepts,
          technologies: mapBackupTechnologies(technologies)
        };
      })
    }));
  }
}

// Fetch all academic, bootcamp, and certification education
export async function getEducation() {
  const mapBackupTechnologies = (tools) => {
    return (tools || []).map(t => ({
      name: t,
      icon: null
    }));
  };

  const processLocalBackup = () => {
    const mappedAcademic = academicBackup.map(edu => {
      const tools = edu.skills || [];
      const technologies = tools.filter(t => softwareList.includes(t.toLowerCase().trim()));
      const concepts = tools.filter(t => !softwareList.includes(t.toLowerCase().trim()));
      return { ...edu, concepts, technologies: mapBackupTechnologies(technologies) };
    });

    const mappedBootcamps = bootcampBackup.map(boot => {
      const tools = boot.skills || [];
      const technologies = tools.filter(t => softwareList.includes(t.toLowerCase().trim()));
      const concepts = tools.filter(t => !softwareList.includes(t.toLowerCase().trim()));
      return { ...boot, concepts, technologies: mapBackupTechnologies(technologies) };
    });

    return { academicData: mappedAcademic, bootcampData: mappedBootcamps, certificationData: fallbackCertCategories };
  };

  if (!supabase) return processLocalBackup();

  try {
    const techDetailsMap = await getTechnologyDetailsMap();

    const { data: academic, error: acError } = await supabase
      .from('academic_education')
      .select('*')
      .order('display_order', { ascending: true });

    const { data: bootcamps, error: btError } = await supabase
      .from('bootcamps')
      .select('*')
      .order('display_order', { ascending: true });

    const { data: certCategories, error: ccError } = await supabase
      .from('certifications_categories')
      .select('*')
      .order('display_order', { ascending: true });

    const { data: certs, error: certError } = await supabase
      .from('certifications')
      .select('*')
      .order('display_order', { ascending: true });

    if (acError || btError || ccError || certError) throw new Error('Error fetching education data');

    const resolveTech = (rawTech) => {
      return (rawTech || []).map(val => {
        const normalizedVal = val.toLowerCase().trim();
        // 1. Direct lookup by key
        if (techDetailsMap[normalizedVal]) {
          return {
            name: techDetailsMap[normalizedVal].name,
            icon: techDetailsMap[normalizedVal].icon
          };
        }
        // 2. Case-insensitive lookup of id or replace spaces
        const matchById = Object.keys(techDetailsMap).find(id => 
          id.toLowerCase() === normalizedVal || 
          id.toLowerCase().replace(/\s+/g, '') === normalizedVal.replace(/\s+/g, '')
        );
        if (matchById) {
          return {
            name: techDetailsMap[matchById].name,
            icon: techDetailsMap[matchById].icon
          };
        }
        // 3. Match by name
        const matchByName = Object.keys(techDetailsMap).find(id => 
          techDetailsMap[id].name.toLowerCase().trim() === normalizedVal
        );
        if (matchByName) {
          return {
            name: techDetailsMap[matchByName].name,
            icon: techDetailsMap[matchByName].icon
          };
        }
        // Fallback
        return {
          name: val,
          icon: null
        };
      });
    };

    const mappedAcademic = academic.map(edu => {
      let concepts = edu.concepts || [];
      let rawTech = edu.technologies || [];
      if (concepts.length === 0 && rawTech.length === 0) {
        const tools = edu.skills || [];
        rawTech = tools.filter(t => softwareList.includes(t.toLowerCase().trim()));
        concepts = tools.filter(t => !softwareList.includes(t.toLowerCase().trim()));
      }

      return {
        id: edu.id,
        level: edu.level,
        speciality: edu.speciality,
        department: edu.department,
        school: edu.school,
        university: edu.university,
        location: `${edu.location_city}, ${edu.location_country}`,
        period: formatDateRange(edu.start_date, edu.end_date),
        description: edu.description,
        concepts,
        technologies: resolveTech(rawTech)
      };
    });

    const mappedBootcamps = bootcamps.map(boot => {
      let concepts = boot.concepts || [];
      let rawTech = boot.technologies || [];
      if (concepts.length === 0 && rawTech.length === 0) {
        const tools = boot.skills || [];
        rawTech = tools.filter(t => softwareList.includes(t.toLowerCase().trim()));
        concepts = tools.filter(t => !softwareList.includes(t.toLowerCase().trim()));
      }

      return {
        id: boot.id,
        title: boot.title,
        format: boot.format,
        location: boot.site_name ? `${boot.site_name}, ${boot.location_city}, ${boot.location_country}` : `${boot.location_city}, ${boot.location_country}`,
        operator: boot.operator,
        period: formatDateRange(boot.start_date, boot.end_date),
        description: boot.description,
        concepts,
        technologies: resolveTech(rawTech)
      };
    });

    // Group certifications by category
    const groupedCertifications = certCategories.map(cat => ({
      id: cat.id,
      category: cat.category_name,
      description: cat.category_description,
      certs: certs.filter(c => c.category_id === cat.id).map(c => ({
        id: c.id,
        title: c.title,
        provider: c.provider,
        skills: c.skills || [],
        certificateLink: c.certificate_link
      }))
    }));

    const result = {
      academicData: mappedAcademic,
      bootcampData: mappedBootcamps,
      certificationData: groupedCertifications
    };

    localStorage.setItem('portfolio_education', JSON.stringify(result));
    return result;
  } catch (error) {
    console.error('Error fetching education from Supabase:', error);
    const cached = localStorage.getItem('portfolio_education');
    return cached ? JSON.parse(cached) : processLocalBackup();
  }
}

// Fetch professional experiences
export async function getExperience() {
  const fallbackExperienceDurations = {
    'ocp-group': 5,
    'alten-group': 4,
    'local-workshop': 3
  };

  const mapBackupTechnologies = (tools) => {
    return (tools || []).map(t => ({
      name: t,
      icon: null
    }));
  };

  if (!supabase) {
    return experienceBackup.map(exp => ({
      ...exp,
      durationMonths: fallbackExperienceDurations[exp.id] || 0,
      technologies: mapBackupTechnologies(exp.skills),
      whatLearned: []
    }));
  }

  try {
    const techDetailsMap = await getTechnologyDetailsMap();

    const { data, error } = await supabase
      .from('experiences')
      .select('*')
      .order('display_order', { ascending: true });

    if (error) throw error;

    const mapped = data.map(exp => {
      const start = exp.start_date;
      const end = exp.end_date || 'present';
      let months = 0;
      if (start) {
        const [sYear, sMonth] = start.split('-').map(Number);
        let eYear, eMonth;
        if (end.toLowerCase() === 'present') {
          const now = new Date();
          eYear = now.getFullYear();
          eMonth = now.getMonth() + 1;
        } else {
          const parts = end.split('-');
          eYear = Number(parts[0]);
          eMonth = parts[1] ? Number(parts[1]) : 12;
        }
        months = (eYear - sYear) * 12 + (eMonth - sMonth) + 1;
      }

      // Map technologies array containing IDs from technology_icons table
      let techList = [];
      if (exp.technologies && Array.isArray(exp.technologies)) {
        techList = exp.technologies.map(id => {
          const detail = techDetailsMap[id];
          return {
            name: detail ? detail.name : id,
            icon: detail ? detail.icon : null
          };
        });
      }

      return {
        id: exp.id,
        title: exp.title,
        company: exp.company,
        companyShort: exp.company_short,
        location: exp.site_location ? `${exp.site_location}, ${exp.location_city}, ${exp.location_country}` : `${exp.location_city}, ${exp.location_country}`,
        type: exp.type,
        jobType: exp.job_type,
        startDate: formatMonthYear(exp.start_date),
        endDate: formatMonthYear(exp.end_date),
        duration: exp.duration,
        durationMonths: months,
        description: exp.description,
        responsibilities: exp.responsibilities || [],
        skills: exp.skills || [],
        technologies: techList,
        whatLearned: exp.what_learned || exp.learned || exp.what_ive_learned || []
      };
    });

    localStorage.setItem('portfolio_experience', JSON.stringify(mapped));
    return mapped;
  } catch (error) {
    console.error('Error fetching experience from Supabase:', error);
    const cached = localStorage.getItem('portfolio_experience');
    if (cached) return JSON.parse(cached);
    return experienceBackup.map(exp => ({
      ...exp,
      durationMonths: fallbackExperienceDurations[exp.id] || 0,
      technologies: mapBackupTechnologies(exp.skills),
      whatLearned: []
    }));
  }
}

// Fetch extracurricular activities (for Blog page)
export async function getActivities() {
  if (!supabase) return activitiesBackup;
  try {
    const { data, error } = await supabase
      .from('extracurricular_activities')
      .select('*')
      .order('display_order', { ascending: true });

    if (error) throw error;

    const mapped = data.map(act => ({
      id: act.id,
      title: act.title,
      subtitle: act.subtitle,
      organization: act.organization,
      period: formatDateRange(act.start_date, act.end_date),
      description: act.description,
      highlights: act.highlights || [],
      tags: act.tags || []
    }));

    localStorage.setItem('portfolio_activities', JSON.stringify(mapped));
    return mapped;
  } catch (error) {
    console.error('Error fetching activities from Supabase:', error);
    const cached = localStorage.getItem('portfolio_activities');
    return cached ? JSON.parse(cached) : activitiesBackup;
  }
}

// Fetch contact settings (social links, email, phone)
export async function getContactSettings() {
  const fallbackContacts = {
    email: 'rachidkherbech@gmail.com',
    phone: '+212 771 907 202',
    whatsapp: 'https://wa.me/212771907202',
    github: 'https://github.com/yoorax',
    linkedin: 'https://linkedin.com/in/rachid-kherbech-1a2b3c',
    instagram: 'https://instagram.com/yoorachid',
    reddit: 'https://reddit.com',
    medium: 'https://medium.com/@rachidkherbech',
    location: 'Agadir, Morocco',
    resume_url: process.env.REACT_APP_RESUME_URL || 'https://awcaqmdzyhrcnlytjcec.supabase.co/storage/v1/object/public/portfolio-assets/home_page/resumes/BI_and_Data_Analytics_Engineer.pdf'
  };

  if (!supabase) return fallbackContacts;

  try {
    const { data, error } = await supabase
      .from('contact_settings')
      .select('key, value');

    if (error) throw error;

    const settings = {};
    data.forEach(item => {
      settings[item.key] = item.value;
    });

    const merged = { ...fallbackContacts, ...settings };
    localStorage.setItem('portfolio_contact_settings', JSON.stringify(merged));
    return merged;
  } catch (error) {
    console.error('Error fetching contact settings from Supabase:', error);
    const cached = localStorage.getItem('portfolio_contact_settings');
    return cached ? JSON.parse(cached) : fallbackContacts;
  }
}

// Fetch skills to be displayed in the infinite marquee
export async function getMarqueeSkills() {
  const fallbackSkills = [
    { name: 'SolidWorks', logo: 'https://awcaqmdzyhrcnlytjcec.supabase.co/storage/v1/object/public/portfolio-assets/technologies/solidworks.webp' },
    { name: 'CATIA V5', logo: 'https://awcaqmdzyhrcnlytjcec.supabase.co/storage/v1/object/public/portfolio-assets/technologies/catia.webp' },
    { name: 'Python', logo: 'https://awcaqmdzyhrcnlytjcec.supabase.co/storage/v1/object/public/portfolio-assets/technologies/python.webp' },
    { name: 'Power BI', logo: 'https://awcaqmdzyhrcnlytjcec.supabase.co/storage/v1/object/public/portfolio-assets/technologies_icons/power_bi.webp' },
    { name: 'MATLAB', logo: 'https://awcaqmdzyhrcnlytjcec.supabase.co/storage/v1/object/public/portfolio-assets/technologies/matlab.webp' },
    { name: 'Simulink', logo: 'https://awcaqmdzyhrcnlytjcec.supabase.co/storage/v1/object/public/portfolio-assets/technologies/simulink.webp' },
    { name: 'Fusion 360', logo: 'https://awcaqmdzyhrcnlytjcec.supabase.co/storage/v1/object/public/portfolio-assets/technologies/fusion360.webp' }
  ];

  if (!supabase) return fallbackSkills;

  try {
    const { data, error } = await supabase
      .from('technology_icons')
      .select('*');

    if (error) throw error;

    const filtered = data.filter(item => {
      if (item.hasOwnProperty('displayed_infinite_marquee')) {
        return item.displayed_infinite_marquee === true;
      }
      return item.displayed_in_infinite_marquee === true;
    });

    if (filtered.length === 0) return fallbackSkills;

    return filtered.map(item => {
      let logoUrl = item.icon_link;
      if (logoUrl && logoUrl.includes('/technologies/') && !logoUrl.includes('/technologies_icons/')) {
        logoUrl = logoUrl.replace('/technologies/', '/technologies_icons/');
      }
      return {
        name: item.software_name,
        logo: logoUrl
      };
    });
  } catch (error) {
    console.error('Error fetching marquee skills:', error);
    return fallbackSkills;
  }
}

