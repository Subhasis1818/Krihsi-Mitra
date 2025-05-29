//  Groq API Key
const API_KEY = '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';
const API_URL = 'https://api.groq.com/openai/v1/chat/completions';

const form = document.getElementById('diseaseForm');
const submitBtn = document.getElementById('submitBtn');
const resultsSection = document.getElementById('resultsSection');
const diseaseInfo = document.getElementById('diseaseInfo');
const managementInfo = document.getElementById('managementInfo');
const preventionInfo = document.getElementById('preventionInfo');
const newDiagnosisBtn = document.getElementById('newDiagnosisBtn');
const generateReportBtn = document.getElementById('generateReportBtn');

const plantInput = document.getElementById('plant');
const symptomsInput = document.getElementById('symptoms');
const durationInput = document.getElementById('duration');
const factorsInput = document.getElementById('factors');

const translations = {
    en: {
        title: "Crop Disease Identification",
        cardTitle: "Identify Crop Disease",
        plantLabel: "Plant Type",
        plantPlaceholder: "Enter plant name (e.g., tomato, wheat, rice)...",
        symptomsLabel: "What symptoms are you seeing?",
        symptomsPlaceholder: "Describe the symptoms you observe (e.g., yellow leaves, brown spots, wilting)...",
        durationLabel: "How long have the symptoms been present?",
        durationPlaceholder: "Enter duration (e.g., 3 days, 2 weeks)...",
        factorsLabel: "Environmental Factors (Optional)",
        factorsPlaceholder: "Describe environmental conditions (humidity, temperature, rainfall, etc.)...",
        submitBtn: "Identify Disease",
        analyzingBtn: "Analyzing...",
        diseaseInfoTitle: "Disease Information",
        managementTitle: "Management Recommendations",
        preventionTitle: "Prevention Tips",
        newDiagnosisBtn: "New Diagnosis",
        generateReportBtn: "Generate Report",
        howItWorksTitle: "How It Works",
        howItWorksText: "Our advanced system analyzes your plant symptoms and environmental conditions to provide accurate disease identification and treatment recommendations.",
        expertSupportTitle: "Expert Support",
        expertSupportText: "Get professional agricultural advice and connect with farming experts for personalized crop disease management solutions.",
        validationError: "Please fill in all required fields",
        apiError: "Failed to identify disease. Please check your internet connection and try again.",
        reportGenerated: "Report generated successfully!"
    },
    hi: {
        title: "फसल रोग पहचान",
        cardTitle: "फसल रोग की पहचान करें",
        plantLabel: "पौधे का प्रकार",
        plantPlaceholder: "पौधे का नाम दर्ज करें (जैसे: टमाटर, गेहूं, चावल)...",
        symptomsLabel: "आप कौन से लक्षण देख रहे हैं?",
        symptomsPlaceholder: "आपके द्वारा देखे गए लक्षणों का वर्णन करें (जैसे: पीले पत्ते, भूरे धब्बे, मुरझाना)...",
        durationLabel: "लक्षण कितने समय से मौजूद हैं?",
        durationPlaceholder: "अवधि दर्ज करें (जैसे: 3 दिन, 2 सप्ताह)...",
        factorsLabel: "पर्यावरणीय कारक (वैकल्पिक)",
        factorsPlaceholder: "पर्यावरणीय स्थितियों का वर्णन करें (आर्द्रता, तापमान, वर्षा, आदि)...",
        submitBtn: "रोग की पहचान करें",
        analyzingBtn: "विश्लेषण कर रहे हैं...",
        diseaseInfoTitle: "रोग की जानकारी",
        managementTitle: "प्रबंधन सुझाव",
        preventionTitle: "बचाव के उपाय",
        newDiagnosisBtn: "नया निदान",
        generateReportBtn: "रिपोर्ट तैयार करें",
        howItWorksTitle: "यह कैसे काम करता है",
        howItWorksText: "हमारी उन्नत प्रणाली आपके पौधे के लक्षणों और पर्यावरणीय स्थितियों का विश्लेषण करके सटीक रोग पहचान और उपचार की सिफारिशें प्रदान करती है।",
        expertSupportTitle: "विशेषज्ञ सहायता",
        expertSupportText: "व्यक्तिगत फसल रोग प्रबंधन समाधान के लिए पेशेवर कृषि सलाह प्राप्त करें और कृषि विशेषज्ञों से जुड़ें।",
        validationError: "कृपया सभी आवश्यक फ़ील्ड भरें",
        apiError: "रोग की पहचान करने में असफल। कृपया अपना इंटरनेट कनेक्शन जांचें और फिर से कोशिश करें।",
        reportGenerated: "रिपोर्ट सफलतापूर्वक तैयार की गई!"
    }
};

let currentLanguage = 'en';

document.addEventListener('DOMContentLoaded', initializeApp);

function initializeApp() {
    console.log('Crop Disease Identification System loaded');
    
    if (API_KEY === 'your-api-key-here') {
        console.warn('Please set your Groq API key in the script.js file');
    } else {
        console.log('Groq API key configured');
    }
    
    const savedLanguage = sessionStorage.getItem('selectedLanguage') || 'en';
    currentLanguage = savedLanguage;
    
    const languageSelector = document.getElementById('language');
    if (languageSelector) {
        languageSelector.value = savedLanguage;
        languageSelector.addEventListener('change', handleLanguageChange);
    }
    
    updateLanguage(savedLanguage);
    
    if (form) form.addEventListener('submit', handleFormSubmit);
    if (newDiagnosisBtn) newDiagnosisBtn.addEventListener('click', clearResults);
    if (generateReportBtn) generateReportBtn.addEventListener('click', generateReport);
}

function handleLanguageChange(e) {
    const selectedLanguage = e.target.value;
    currentLanguage = selectedLanguage;
    updateLanguage(selectedLanguage);
    sessionStorage.setItem('selectedLanguage', selectedLanguage);
}

function updateLanguage(lang) {
    const t = translations[lang] || translations['en'];
    
    const titleElement = document.querySelector('.title');
    if (titleElement) {
        titleElement.innerHTML = `<i class=""></i> ${t.title}`;
    }
    
    const cardTitle = document.querySelector('.card-header h2');
    if (cardTitle) cardTitle.textContent = t.cardTitle;
    
    updateFormElement('label[for="plant"]', t.plantLabel);
    updateFormElement('#plant', null, t.plantPlaceholder);
    
    updateFormElement('label[for="symptoms"]', t.symptomsLabel);
    updateFormElement('#symptoms', null, t.symptomsPlaceholder);
    
    updateFormElement('label[for="duration"]', t.durationLabel);
    updateFormElement('#duration', null, t.durationPlaceholder);
    
    updateFormElement('label[for="factors"]', t.factorsLabel);
    updateFormElement('#factors', null, t.factorsPlaceholder);
    
    const submitButton = document.querySelector('.submit-btn') || submitBtn;
    if (submitButton && !submitButton.disabled) {
        submitButton.innerHTML = `<i class="fas fa-search"></i> ${t.submitBtn}`;
    }
    
    updateFormElement('.disease-info h3', t.diseaseInfoTitle);
    updateFormElement('.management-section h4', t.managementTitle);
    updateFormElement('.prevention-section h4', t.preventionTitle);
    
    const actionButtons = document.querySelectorAll('.action-btn');
    if (actionButtons.length >= 2) {
        actionButtons[0].textContent = t.newDiagnosisBtn;
        actionButtons[1].textContent = t.generateReportBtn;
    }
    
    const infoCards = document.querySelectorAll('.info-card');
    if (infoCards.length >= 2) {
        const howItWorksTitle = infoCards[0].querySelector('h3');
        const howItWorksText = infoCards[0].querySelector('p');
        const expertTitle = infoCards[1].querySelector('h3');
        const expertText = infoCards[1].querySelector('p');
        
        if (howItWorksTitle) howItWorksTitle.textContent = t.howItWorksTitle;
        if (howItWorksText) howItWorksText.textContent = t.howItWorksText;
        if (expertTitle) expertTitle.textContent = t.expertSupportTitle;
        if (expertText) expertText.textContent = t.expertSupportText;
    }
}

function updateFormElement(selector, textContent, placeholder) {
    const element = document.querySelector(selector);
    if (element) {
        if (textContent !== null) element.textContent = textContent;
        if (placeholder !== null) element.placeholder = placeholder;
    }
}

async function handleFormSubmit(e) {
    e.preventDefault();
    
    const formData = {
        plant: plantInput.value.trim(),
        symptoms: symptomsInput.value.trim(),
        duration: durationInput.value.trim(),
        factors: factorsInput.value.trim()
    };
    
    if (!formData.plant || !formData.symptoms || !formData.duration) {
        showMessage(translations[currentLanguage].validationError, 'error');
        return;
    }
    
    setLoadingState(true);
    
    try {
        const response = await identifyDisease(formData);
        
        displayResults(response);
        
    } catch (error) {
        console.error('Error:', error);
        showMessage(`${translations[currentLanguage].apiError} ${error.message}`, 'error');
    } finally {
        setLoadingState(false);
    }
}

async function identifyDisease(formData) {
    const prompt = createPrompt(formData);
    
    const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${API_KEY}`
        },
        body: JSON.stringify({
            model: 'llama3-8b-8192',
            messages: [
                {
                    role: 'system',
                    content: 'You are an expert agricultural specialist and plant pathologist. Provide detailed, accurate information about crop diseases based on symptoms described. Always respond with valid JSON format.'
                },
                {
                    role: 'user',
                    content: prompt
                }
            ],
            max_tokens: 1000,
            temperature: 0.7
        })
    });
    
    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error('API Error Details:', errorData);
        throw new Error(`API Error: ${response.status} - ${errorData.error?.message || 'Unknown error'}`);
    }
    
    const data = await response.json();
    console.log('Raw API Response:', data);
    console.log('Message Content:', data.choices[0].message.content);
    
    return parseApiResponse(data.choices[0].message.content);
}

function createPrompt(formData) {
    return `
Please analyze the following crop disease symptoms and provide a detailed response in JSON format:

Plant Type: ${formData.plant}
Symptoms: ${formData.symptoms}
Duration: ${formData.duration}
Environmental Factors: ${formData.factors || 'Not specified'}

Please respond with a JSON object containing exactly these fields:
{
    "disease": "Most likely disease name",
    "description": "Detailed description of the disease, its causes, and how it affects the plant",
    "management": "Specific management and treatment recommendations including chemical, biological, and cultural practices",
    "prevention": "Prevention tips and best practices to avoid future occurrences"
}

Make sure the response is practical, actionable for farmers, and follows proper agricultural practices. Include specific product names or methods where appropriate.
    `.trim();
}

function safeStringify(value) {
    if (value === null || value === undefined) {
        return 'Not available';
    }
    
    if (typeof value === 'string') {
        return value;
    }
    
    if (typeof value === 'object') {
        try {
            if (Array.isArray(value)) {
                return value.map(item => safeStringify(item)).join('. ');
            }
            
            const keys = Object.keys(value);
            if (keys.length === 0) {
                return 'Information not available';
            }
            
            const textContent = keys.map(key => {
                const val = value[key];
                if (typeof val === 'string' && val.trim()) {
                    return val;
                } else if (typeof val === 'object' && val !== null) {
                    return safeStringify(val);
                }
                return null;
            }).filter(Boolean).join('. ');
            
            return textContent || JSON.stringify(value);
        } catch (e) {
            return String(value);
        }
    }
    
    return String(value);
}

function parseApiResponse(responseText) {
    console.log('Raw response text:', responseText);
    
    try {
        const cleanedText = responseText.trim();
        
        const jsonMatch = cleanedText.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
            console.log('Found JSON match:', jsonMatch[0]);
            const parsedData = JSON.parse(jsonMatch[0]);
            console.log('Parsed data:', parsedData);
            
            const result = {
                disease: safeStringify(parsedData.disease) || 'Disease Analysis',
                description: safeStringify(parsedData.description) || 'Description not available',
                management: safeStringify(parsedData.management) || 'Management information not available',
                prevention: safeStringify(parsedData.prevention) || 'Prevention information not available'
            };
            
            console.log('Final result object:', result);
            return result;
        }
        
        try {
            const directParse = JSON.parse(cleanedText);
            console.log('Direct JSON parse successful:', directParse);
            
            const result = {
                disease: safeStringify(directParse.disease) || 'Disease Analysis',
                description: safeStringify(directParse.description) || 'Description not available',
                management: safeStringify(directParse.management) || 'Management information not available',
                prevention: safeStringify(directParse.prevention) || 'Prevention information not available'
            };
            
            console.log('Direct parse result:', result);
            return result;
        } catch (directParseError) {
            console.log('Direct JSON parse failed:', directParseError);
        }
        
        console.log('Using fallback from text');
        return createFallbackFromText(responseText);
    } catch (error) {
        console.error('Error parsing response:', error);
        console.log('Using final fallback response');
        return createFallbackResponse();
    }
}

function createFallbackFromText(responseText) {
    const lines = responseText.split('\n').filter(line => line.trim());
    
    return {
        disease: 'Disease Analysis Based on Symptoms',
        description: lines.slice(0, 3).join(' ').substring(0, 300) + '...',
        management: 'Please consult with a local agricultural extension officer for specific treatment recommendations based on the analysis provided.',
        prevention: 'Follow good agricultural practices including proper spacing, adequate drainage, crop rotation, and regular monitoring for early detection.'
    };
}

function createFallbackResponse() {
    return {
        disease: 'Unable to determine specific disease',
        description: 'Based on the symptoms provided, professional consultation is recommended for accurate diagnosis. The symptoms described may indicate multiple possible conditions.',
        management: 'Contact your local agricultural extension office or plant pathologist for proper diagnosis and treatment. Consider soil testing and professional plant tissue analysis.',
        prevention: 'Maintain good crop hygiene, ensure proper drainage, implement crop rotation, use disease-resistant varieties, and monitor plants regularly for early detection of issues.'
    };
}

function displayResults(data) {
    console.log('displayResults called with:', data);
    
    if (!resultsSection || !diseaseInfo || !managementInfo || !preventionInfo) {
        console.error('Results elements not found');
        return;
    }
    
    resultsSection.style.display = 'block';
    
    const disease = data.disease || 'Disease Analysis';
    const description = data.description || 'Description not available';
    const management = data.management || 'Management information not available';
    const prevention = data.prevention || 'Prevention information not available';
    
    console.log('Final values for display:', {
        disease,
        description: description.substring(0, 50) + '...',
        management: management.substring(0, 50) + '...',
        prevention: prevention.substring(0, 50) + '...'
    });
    
    diseaseInfo.innerHTML = `
        <h4 style="color: #1f2937; margin-bottom: 15px; font-size: 1.25rem;">${disease}</h4>
        <p style="line-height: 1.6; color: #374151;">${description}</p>
    `;
    
    managementInfo.innerHTML = `<p style="line-height: 1.6; color: #374151;">${management}</p>`;
    
    preventionInfo.innerHTML = `<p style="line-height: 1.6; color: #374151;">${prevention}</p>`;
    
    resultsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function setLoadingState(isLoading) {
    if (!submitBtn) return;
    
    const t = translations[currentLanguage];
    
    if (isLoading) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = `<i class="fas fa-spinner fa-spin"></i> ${t.analyzingBtn}`;
        submitBtn.classList.add('loading');
    } else {
        submitBtn.disabled = false;
        submitBtn.innerHTML = `<i class="fas fa-search"></i> ${t.submitBtn}`;
        submitBtn.classList.remove('loading');
    }
}

function showMessage(message, type = 'info') {
    let messageContainer = document.getElementById('messageContainer');
    if (!messageContainer) {
        messageContainer = document.createElement('div');
        messageContainer.id = 'messageContainer';
        messageContainer.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            z-index: 1000;
            max-width: 400px;
        `;
        document.body.appendChild(messageContainer);
    }
    
    const messageElement = document.createElement('div');
    messageElement.style.cssText = `
        padding: 12px 16px;
        margin-bottom: 10px;
        border-radius: 6px;
        color: white;
        font-weight: 500;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        transform: translateX(100%);
        transition: transform 0.3s ease;
        background-color: ${type === 'error' ? '#ef4444' : type === 'success' ? '#10b981' : '#3b82f6'};
    `;
    messageElement.textContent = message;
    
    messageContainer.appendChild(messageElement);
    
    setTimeout(() => {
        messageElement.style.transform = 'translateX(0)';
    }, 100);
    
    setTimeout(() => {
        messageElement.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (messageElement.parentNode) {
                messageElement.parentNode.removeChild(messageElement);
            }
        }, 300);
    }, 5000);
}

function clearResults() {
    if (resultsSection) resultsSection.style.display = 'none';
    
    if (form) form.reset();
    
    if (diseaseInfo) diseaseInfo.innerHTML = '';
    if (managementInfo) managementInfo.innerHTML = '';
    if (preventionInfo) preventionInfo.innerHTML = '';
    
    if (form) form.scrollIntoView({ behavior: 'smooth' });
    
    showMessage('Form cleared. Ready for new diagnosis.', 'info');
}

function generateReport() {
    if (!diseaseInfo || !diseaseInfo.textContent.trim()) {
        showMessage('No diagnosis data available to generate report.', 'error');
        return;
    }
    
    const plantType = plantInput?.value || 'Unknown Plant';
    const symptoms = symptomsInput?.value || 'Not specified';
    const duration = durationInput?.value || 'Not specified';
    const factors = factorsInput?.value || 'Not specified';
    const diseaseTitle = diseaseInfo.querySelector('h4')?.textContent || 'Disease Report';
    
    const diseaseText = diseaseInfo.textContent || 'No disease information available';
    const managementText = managementInfo?.textContent || 'No management information available';
    const preventionText = preventionInfo?.textContent || 'No prevention information available';
    
    const reportContent = `
CROP DISEASE IDENTIFICATION REPORT
=====================================

Generated: ${new Date().toLocaleString()}
Language: ${currentLanguage.toUpperCase()}

PLANT INFORMATION
-----------------
Plant Type: ${plantType}
Symptoms: ${symptoms}
Duration: ${duration}
Environmental Factors: ${factors}

DIAGNOSIS RESULTS
-----------------
${diseaseText}

MANAGEMENT RECOMMENDATIONS
--------------------------
${managementText}

PREVENTION MEASURES
-------------------
${preventionText}

DISCLAIMER
----------
This report is generated by an AI-powered crop disease identification system.
For critical decisions, please consult with local agricultural extension 
services or certified plant pathologists.

---
Generated by Crop Disease Identification System
Report ID: CDI-${Date.now()}
    `;
    
    try {
        const blob = new Blob([reportContent], { type: 'text/plain; charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `crop-disease-report-${new Date().toISOString().split('T')[0]}-${Date.now()}.txt`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
        showMessage(translations[currentLanguage].reportGenerated, 'success');
    } catch (error) {
        console.error('Error generating report:', error);
        showMessage('Failed to generate report. Please try again.', 'error');
    }
}
