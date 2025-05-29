document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('seedForm');
    const submitBtn = document.getElementById('submitBtn');
    const resultSection = document.getElementById('resultSection');
    const seedInfo = document.getElementById('seedInfo');
    const descriptionInfo = document.getElementById('descriptionInfo');
    const tipsInfo = document.getElementById('tipsInfo');
    const newRecommendationBtn = document.getElementById('newRecommendationBtn');
    const saveRecommendationBtn = document.getElementById('saveRecommendationBtn');
    const languageSelector = document.getElementById('language');

    const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';
    const GROQ_API_KEY = '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';

    const translations = {
        en: {
            title: "Seed Finder",
            
            cropLabel: "Which plant do you want to grow?",
            cropPlaceholder: "Enter plant name (e.g., wheat, rice, corn, tomato)...",
            soilTypeLabel: "What is your soil type?",
            selectSoilType: "Select Soil Type",
            monthLabel: "What is your sowing month?",
            selectMonth: "Select Month",
            preferencesLabel: "Select your priorities:",
            
            redSoil: "Red Soil",
            blackSoil: "Black Soil",
            alluvialSoil: "Alluvial Soil",
            sandySoil: "Sandy Soil",
            claySoil: "Clay Soil",
            loamySoil: "Loamy Soil",
            
            january: "January",
            february: "February", 
            march: "March",
            april: "April",
            may: "May",
            june: "June",
            july: "July",
            august: "August",
            september: "September",
            october: "October",
            november: "November",
            december: "December",
            
            highYield: "High Yield",
            diseaseResistance: "Disease Resistance",
            droughtTolerance: "Drought Tolerance",
            
            getRecommendations: "Get AI Recommendations",
            gettingRecommendations: "Getting AI Recommendations...",
            newRecommendation: "New Recommendation",
            
            recommendedSeeds: "Recommended Seeds",
            detailedRecommendation: "Detailed Recommendation",
            growingTips: "Growing Tips",
            
            aiPoweredTitle: "AI-Powered Recommendations",
            aiPoweredDesc: "Our advanced AI analyzes your specific conditions to recommend the highest yielding seed varieties for your farm.",
            maximizeProductivityTitle: "Maximize Productivity",
            maximizeProductivityDesc: "Get scientifically-backed seed recommendations tailored to your soil type, climate, and farming goals.",
            
            enterCrop: "Please enter a crop name.",
            selectSoilTypeError: "Please select your soil type.",
            selectMonthError: "Please select a sowing month.",
            selectPreference: "Please select at least one preference.",
            atLeastOnePreference: "At least one preference must be selected.",
            networkError: "Network error. Please check your internet connection and try again.",
            savedSuccessfully: "Recommendation saved successfully!",
            
            seedRecommendation: "Seed Recommendation"
        },
        hi: {
            title: "बीज खोजक",
            
            cropLabel: "आप कौन सी फसल उगाना चाहते हैं?",
            cropPlaceholder: "फसल का नाम दर्ज करें (जैसे गेहूं, चावल, मक्का, टमाटर)...",
            soilTypeLabel: "आपकी मिट्टी का प्रकार क्या है?",
            selectSoilType: "मिट्टी का प्रकार चुनें",
            monthLabel: "आपका बुवाई का महीना कौन सा है?",
            selectMonth: "महीना चुनें",
            preferencesLabel: "अपनी प्राथमिकताएं चुनें:",
            
            redSoil: "लाल मिट्टी",
            blackSoil: "काली मिट्टी",
            alluvialSoil: "जलोढ़ मिट्टी",
            sandySoil: "बलुई मिट्टी",
            claySoil: "चिकनी मिट्टी",
            loamySoil: "दोमट मिट्टी",
            
            january: "जनवरी",
            february: "फरवरी",
            march: "मार्च",
            april: "अप्रैल",
            may: "मई",
            june: "जून",
            july: "जुलाई",
            august: "अगस्त",
            september: "सितंबर",
            october: "अक्टूबर",
            november: "नवंबर",
            december: "दिसंबर",
            
            highYield: "उच्च उत्पादन",
            diseaseResistance: "रोग प्रतिरोध",
            droughtTolerance: "सूखा सहनशीलता",
            
            getRecommendations: "AI सुझाव प्राप्त करें",
            gettingRecommendations: "AI सुझाव प्राप्त कर रहे हैं...",
            newRecommendation: "नया सुझाव",
            
            recommendedSeeds: "सुझाए गए बीज",
            detailedRecommendation: "विस्तृत सुझाव",
            growingTips: "खेती की तकनीक",
            
            aiPoweredTitle: "AI-संचालित सुझाव",
            aiPoweredDesc: "हमारा उन्नत AI आपकी विशिष्ट परिस्थितियों का विश्लेषण करके आपके खेत के लिए सबसे अधिक उत्पादन देने वाली बीज किस्मों की सिफारिश करता है।",
            maximizeProductivityTitle: "उत्पादकता बढ़ाएं",
            maximizeProductivityDesc: "अपनी मिट्टी के प्रकार, जलवायु और खेती के लक्ष्यों के अनुकूल वैज्ञानिक रूप से समर्थित बीज सुझाव प्राप्त करें।",
            
            enterCrop: "कृपया फसल का नाम दर्ज करें।",
            selectSoilTypeError: "कृपया अपनी मिट्टी का प्रकार चुनें।",
            selectMonthError: "कृपया बुवाई का महीना चुनें।",
            selectPreference: "कृपया कम से कम एक प्राथमिकता चुनें।",
            atLeastOnePreference: "कम से कम एक प्राथमिकता का चयन करना आवश्यक है।",
            networkError: "नेटवर्क त्रुटि। कृपया अपना इंटरनेट कनेक्शन जांचें और पुनः प्रयास करें।",
            savedSuccessfully: "सुझाव सफलतापूर्वक सहेजा गया!",
            
            seedRecommendation: "बीज सुझाव"
        }
    };

    let currentLanguage = localStorage.getItem('selectedLanguage') || 'en';
    
    languageSelector.value = currentLanguage;
    updateLanguage(currentLanguage);

    languageSelector.addEventListener('change', function() {
        currentLanguage = this.value;
        localStorage.setItem('selectedLanguage', currentLanguage);
        updateLanguage(currentLanguage);
    });

    function updateLanguage(lang) {
        const t = translations[lang];
        
        document.querySelector('.title').textContent = t.title;
        
        document.querySelector('.card-header h2').textContent = t.seedRecommendation;
        
        document.querySelector('label[for="crop"]').innerHTML = `${t.cropLabel}`;
        document.querySelector('label[for="soilType"]').innerHTML = `${t.soilTypeLabel}`;
        document.querySelector('label[for="month"]').innerHTML = `${t.monthLabel}`;
        document.querySelector('label[for="preferences"]').innerHTML = `${t.preferencesLabel}`;
        
        document.getElementById('crop').placeholder = t.cropPlaceholder;
        
        updateSelectOptions('soilType', [
            { value: '', text: t.selectSoilType },
            { value: 'red', text: t.redSoil },
            { value: 'black', text: t.blackSoil },
            { value: 'alluvial', text: t.alluvialSoil },
            { value: 'sandy', text: t.sandySoil },
            { value: 'clay', text: t.claySoil },
            { value: 'loamy', text: t.loamySoil }
        ]);
        
        updateSelectOptions('month', [
            { value: '', text: t.selectMonth },
            { value: 'January', text: t.january },
            { value: 'February', text: t.february },
            { value: 'March', text: t.march },
            { value: 'April', text: t.april },
            { value: 'May', text: t.may },
            { value: 'June', text: t.june },
            { value: 'July', text: t.july },
            { value: 'August', text: t.august },
            { value: 'September', text: t.september },
            { value: 'October', text: t.october },
            { value: 'November', text: t.november },
            { value: 'December', text: t.december }
        ]);
        
        document.querySelector('label[class="container"]:nth-child(1)').innerHTML = `
            ${t.highYield}
            <input type="checkbox" id="highYield" value="${t.highYield}" checked>
            <span class="checkmark"></span>
        `;
        document.querySelector('label[class="container"]:nth-child(2)').innerHTML = `
            ${t.diseaseResistance}
            <input type="checkbox" id="diseaseResistance" value="${t.diseaseResistance}">
            <span class="checkmark"></span>
        `;
        document.querySelector('label[class="container"]:nth-child(3)').innerHTML = `
            ${t.droughtTolerance}
            <input type="checkbox" id="droughtTolerance" value="${t.droughtTolerance}">
            <span class="checkmark"></span>
        `;
        
        submitBtn.innerHTML = `<i class="fas fa-search"></i> ${t.getRecommendations}`;
        
        // Update results section headings
        document.querySelector('.seed-recommendation h3').textContent = t.recommendedSeeds;
        document.querySelector('.description-section h4').textContent = t.detailedRecommendation;
        document.querySelector('.additional-info h4').textContent = t.growingTips;
        
        newRecommendationBtn.innerHTML = `<i class="fas fa-plus"></i> ${t.newRecommendation}`;
        
        const infoCards = document.querySelectorAll('.info-card');
        if (infoCards.length >= 2) {
            infoCards[0].querySelector('h3').textContent = t.aiPoweredTitle;
            infoCards[0].querySelector('p').textContent = t.aiPoweredDesc;
            infoCards[1].querySelector('h3').textContent = t.maximizeProductivityTitle;
            infoCards[1].querySelector('p').textContent = t.maximizeProductivityDesc;
        }
        
        attachCheckboxListeners();
    }

    function updateSelectOptions(selectId, options) {
        const select = document.getElementById(selectId);
        const currentValue = select.value;
        select.innerHTML = '';
        
        options.forEach(option => {
            const optionElement = document.createElement('option');
            optionElement.value = option.value;
            optionElement.textContent = option.text;
            select.appendChild(optionElement);
        });
        
        select.value = currentValue;
    }

    function getTranslations() {
        return translations[currentLanguage];
    }

    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const formData = getFormData();
        console.log('Form data collected:', formData);

        if (!validateForm(formData)) {
            return;
        }

        showLoading();

        try {
            const recommendation = await getSeedRecommendation(formData);
            displayResults(recommendation);
        } catch (error) {
            console.error('Error getting recommendation:', error);
            showError(`Failed to get seed recommendations: ${error.message}`);
        } finally {
            hideLoading();
        }
    });

    function getFormData() {
        const crop = document.getElementById('crop').value.trim();
        const soilType = document.getElementById('soilType').value;
        const month = document.getElementById('month').value;
        
        const preferences = [];
        const checkboxes = document.querySelectorAll('.preferences-wrapper input[type="checkbox"]:checked');
        checkboxes.forEach(checkbox => {
            preferences.push(checkbox.value);
        });

        return {
            crop,
            soilType,
            month,
            preferences,
            language: currentLanguage
        };
    }

    function validateForm(data) {
        const t = getTranslations();
        
        if (!data.crop) {
            showError(t.enterCrop);
            return false;
        }
        if (!data.soilType) {
            showError(t.selectSoilTypeError);
            return false;
        }
        if (!data.month) {
            showError(t.selectMonthError);
            return false;
        }
        if (data.preferences.length === 0) {
            showError(t.selectPreference);
            return false;
        }
        return true;
    }

    async function getSeedRecommendation(formData) {
        const prompt = createPrompt(formData);
        
        try {
            const response = await fetch(GROQ_API_URL, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${GROQ_API_KEY}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    model: 'llama3-8b-8192',
                    messages: [
                        {
                            role: 'system',
                            content: `You are an expert agricultural scientist and seed specialist. Your role is to provide scientifically accurate, location-specific seed recommendations that maximize yield while considering soil conditions, climate, and farming practices. Always provide practical, actionable advice. ${formData.language === 'hi' ? 'Respond in Hindi language.' : 'Respond in English language.'}`
                        },
                        {
                            role: 'user',
                            content: prompt
                        }
                    ],
                    max_tokens: 1500,
                    temperature: 0.3,
                    top_p: 0.9
                })
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({ error: 'Unknown error' }));
                throw new Error(`API Error: ${response.status} - ${errorData.error?.message || response.statusText}`);
            }

            const data = await response.json();
            
            if (!data.choices || !data.choices[0] || !data.choices[0].message) {
                throw new Error('Invalid API response format');
            }

            return parseRecommendation(data.choices[0].message.content);
            
        } catch (error) {
            console.error('API call failed:', error);
            if (error.name === 'TypeError' && error.message.includes('Failed to fetch')) {
                const t = getTranslations();
                throw new Error(t.networkError);
            }
            throw error;
        }
    }

    function createPrompt(formData) {
        const soilTypeDescriptions = {
            'red': 'Red soil (iron-rich, well-drained, acidic pH)',
            'black': 'Black cotton soil (clay-rich, moisture retentive, slightly alkaline)',
            'alluvial': 'Alluvial soil (fertile, well-balanced nutrients)',
            'sandy': 'Sandy soil (well-drained, low water retention)',
            'clay': 'Clay soil (heavy, high water retention)',
            'loamy': 'Loamy soil (balanced texture, ideal for most crops)'
        };

        const soilDescription = soilTypeDescriptions[formData.soilType] || formData.soilType;
        
        const languageInstruction = formData.language === 'hi' ? 
            'कृपया अपना उत्तर हिंदी में दें।' : 
            'Please provide your response in English.';

        return `${languageInstruction}

As an agricultural expert, provide high-yield seed recommendations for the following conditions:

**Farming Details:**
- Crop: ${formData.crop}
- Soil Type: ${soilDescription}
- Sowing Month: ${formData.month}
- Farmer Priorities: ${formData.preferences.join(', ')}

**Required Information:**
1. **TOP SEED VARIETIES**: List 3-5 specific, high-yielding seed varieties/cultivars best suited for these exact conditions. Include variety names and expected yield ranges.

2. **DETAILED EXPLANATION**: Provide comprehensive reasoning for each recommendation including:
   - Why these varieties are optimal for the specified soil type
   - How the sowing month affects seed selection
   - Expected performance based on farmer priorities
   - Yield potential and quality characteristics

3. **GROWING TIPS**: Include specific cultivation advice:
   - Optimal planting density and spacing
   - Soil preparation requirements
   - Irrigation and fertilization recommendations
   - Pest and disease management specific to these varieties
   - Harvest timing and post-harvest handling

**Format your response as:**
SEEDS: [List specific seed varieties with expected yields]
EXPLANATION: [Detailed reasoning and suitability analysis]
TIPS: [Specific cultivation and management advice]

Focus on maximizing productivity while addressing the farmer's stated priorities. Provide practical, implementable advice based on current agricultural science.`;
    }

    function parseRecommendation(response) {
        const seedsMatch = response.match(/SEEDS:\s*(.*?)(?=EXPLANATION:|$)/s);
        const explanationMatch = response.match(/EXPLANATION:\s*(.*?)(?=TIPS:|$)/s);
        const tipsMatch = response.match(/TIPS:\s*(.*)/s);
        
        return {
            seeds: seedsMatch ? seedsMatch[1].trim() : extractSeedsFromResponse(response),
            explanation: explanationMatch ? explanationMatch[1].trim() : extractExplanationFromResponse(response),
            tips: tipsMatch ? tipsMatch[1].trim() : extractTipsFromResponse(response)
        };
    }

    function extractSeedsFromResponse(response) {
        const lines = response.split('\n');
        const seedLines = lines.filter(line => 
            line.toLowerCase().includes('variety') || 
            line.toLowerCase().includes('cultivar') ||
            line.toLowerCase().includes('seed') ||
            line.match(/^\d+\./)
        ).slice(0, 5);
        return seedLines.join('\n') || response.substring(0, 200);
    }

    function extractExplanationFromResponse(response) {
        const sentences = response.split('. ');
        const explanationSentences = sentences.filter(sentence =>
            sentence.toLowerCase().includes('recommend') ||
            sentence.toLowerCase().includes('suitable') ||
            sentence.toLowerCase().includes('yield') ||
            sentence.toLowerCase().includes('soil')
        );
        return explanationSentences.join('. ') || response;
    }

    function extractTipsFromResponse(response) {
        const lines = response.split('\n');
        const tipLines = lines.filter(line =>
            line.toLowerCase().includes('plant') ||
            line.toLowerCase().includes('fertiliz') ||
            line.toLowerCase().includes('water') ||
            line.toLowerCase().includes('harvest')
        );
        return tipLines.join('\n') || 'Follow standard cultivation practices for your region.';
    }

    // Display results
    function displayResults(recommendation) {
        seedInfo.innerHTML = formatSeeds(recommendation.seeds);
        descriptionInfo.innerHTML = formatDescription(recommendation.explanation);
        tipsInfo.innerHTML = formatTips(recommendation.tips);
        
        resultSection.style.display = 'block';
        resultSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    function formatSeeds(seedsText) {
        let formatted = seedsText
            .replace(/^\d+\.\s*/gm, ' • ')
            .replace(/^[-•]\s*/gm, ' • ')
            .replace(/\n/g, '<br>')
            .replace(/([A-Z][A-Z0-9-]+\s*\d*)/g, '<strong>$1</strong>'); // Highlight variety names
        
        return `<div class="seeds-list">${formatted}</div>`;
    }

    function formatDescription(descriptionText) {
        let formatted = descriptionText
            .replace(/\n\n/g, '</p><p>')
            .replace(/\n/g, '<br>')
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') // Bold text
            .replace(/\b(yield|productivity|disease resistance|drought tolerance|soil|planting|harvest)\b/gi, '<em>$1</em>');
        
        return `<p>${formatted}</p>`;
    }

    function formatTips(tipsText) {
        let formatted = tipsText
            .replace(/^\d+\.\s*/gm, '💡 ')
            .replace(/^[-•]\s*/gm, '💡 ')
            .replace(/\n/g, '<br>')
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        
        return `<div class="tips-list">${formatted}</div>`;
    }

    function showLoading() {
        const t = getTranslations();
        submitBtn.disabled = true;
        submitBtn.innerHTML = `<i class="fas fa-spinner fa-spin"></i> ${t.gettingRecommendations}`;
        resultSection.style.display = 'none';
        clearError();
    }

    function hideLoading() {
        const t = getTranslations();
        submitBtn.disabled = false;
        submitBtn.innerHTML = `<i class="fas fa-search"></i> ${t.getRecommendations}`;
    }

    // Error handling
    function showError(message) {
        clearError();
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error';
        errorDiv.innerHTML = `<i class="fas fa-exclamation-triangle"></i> ${message}`;
        form.appendChild(errorDiv);
        
        setTimeout(() => {
            clearError();
        }, 5000);
    }

    function clearError() {
        const existingError = form.querySelector('.error');
        if (existingError) {
            existingError.remove();
        }
    }

    function attachCheckboxListeners() {
        const checkboxes = document.querySelectorAll('.preferences-wrapper input[type="checkbox"]');
        checkboxes.forEach(checkbox => {
            checkbox.addEventListener('change', function() {
                const checkedBoxes = document.querySelectorAll('.preferences-wrapper input[type="checkbox"]:checked');
                if (checkedBoxes.length === 0) {
                    this.checked = true;
                    const t = getTranslations();
                    showError(t.atLeastOnePreference);
                }
            });
        });
    }

    newRecommendationBtn.addEventListener('click', function() {
        form.reset();
        resultSection.style.display = 'none';
        document.getElementById('highYield').checked = true; // Default selection
        document.querySelector('input[name="crop"]').focus();
        updateLanguage(currentLanguage); // Refresh language after reset
    });

    document.getElementById('highYield').checked = true; // Default selection
    attachCheckboxListeners();
    
    console.log('Seed Recommendation System with Language Support initialized successfully');
});
