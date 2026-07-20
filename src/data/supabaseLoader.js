import { supabase } from '../supabaseClient';
import projectsBackup from './projects';
import { academicData as academicBackup, bootcampData as bootcampBackup, certificationData as certsBackup } from './education';
import experienceBackup from './experience';
import activitiesBackup from './activities';

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
  if (!supabase) return projectsBackup;
  try {
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
      projects: projects.filter(p => p.category_id === cat.id).map(p => ({
        id: p.id,
        name: p.name,
        brief_description: p.brief_description,
        description: p.description,
        tools: p.tools || [],
        category: p.project_category,
        thumbnail: p.thumbnail,
        project_link: p.project_link,
        link_name: p.link_name
      }))
    }));

    localStorage.setItem('portfolio_projects', JSON.stringify(structuredData));
    return structuredData;
  } catch (error) {
    console.error('Error fetching projects from Supabase:', error);
    const cached = localStorage.getItem('portfolio_projects');
    return cached ? JSON.parse(cached) : projectsBackup;
  }
}

// Fetch all academic, bootcamp, and certification education
export async function getEducation() {
  if (!supabase) return { academicData: academicBackup, bootcampData: bootcampBackup, certificationData: fallbackCertCategories };
  try {
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

    // Map split columns to old properties for seamless component integration
    const mappedAcademic = academic.map(edu => ({
      id: edu.id,
      level: edu.level,
      speciality: edu.speciality,
      department: edu.department,
      school: edu.school,
      university: edu.university,
      location: `${edu.location_city}, ${edu.location_country}`,
      period: formatDateRange(edu.start_date, edu.end_date),
      description: edu.description,
      skills: edu.skills || []
    }));

    const mappedBootcamps = bootcamps.map(boot => ({
      id: boot.id,
      title: boot.title,
      format: boot.format,
      location: boot.site_name ? `${boot.site_name}, ${boot.location_city}, ${boot.location_country}` : `${boot.location_city}, ${boot.location_country}`,
      operator: boot.operator,
      period: formatDateRange(boot.start_date, boot.end_date),
      description: boot.description,
      skills: boot.skills || []
    }));

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
    return cached ? JSON.parse(cached) : { academicData: academicBackup, bootcampData: bootcampBackup, certificationData: fallbackCertCategories };
  }
}
// Fetch professional experiences
export async function getExperience() {
  const fallbackExperienceDurations = {
    'ocp-group': 5,
    'alten-group': 4,
    'local-workshop': 3
  };

  if (!supabase) {
    return experienceBackup.map(exp => ({
      ...exp,
      durationMonths: fallbackExperienceDurations[exp.id] || 0
    }));
  }

  try {
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
        skills: exp.skills || []
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
      durationMonths: fallbackExperienceDurations[exp.id] || 0
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
    location: 'Agadir, Morocco'
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
