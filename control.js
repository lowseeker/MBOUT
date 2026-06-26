// ===== 홍명보호 32강 진출 확률 대시보드 - 시뮬레이터 및 API 제어판 스크립트 =====

(function () {
    'use strict';

    // ===== Team Name & Flag Mapping =====
    const TEAM_DB = {
        '1':  { en: 'Mexico', ko: '멕시코', flag: '🇲🇽', iso2: 'MX' },
        '2':  { en: 'South Africa', ko: '남아공', flag: '🇿🇦', iso2: 'ZA' },
        '3':  { en: 'South Korea', ko: '대한민국', flag: '🇰🇷', iso2: 'KR' },
        '4':  { en: 'Czech Republic', ko: '체코', flag: '🇨🇿', iso2: 'CZ' },
        '5':  { en: 'Canada', ko: '캐나다', flag: '🇨🇦', iso2: 'CA' },
        '6':  { en: 'Bosnia and Herzegovina', ko: '보스니아', flag: '🇧🇦', iso2: 'BA' },
        '7':  { en: 'Qatar', ko: '카타르', flag: '🇶🇦', iso2: 'QA' },
        '8':  { en: 'Switzerland', ko: '스위스', flag: '🇨🇭', iso2: 'CH' },
        '9':  { en: 'Brazil', ko: '브라질', flag: '🇧🇷', iso2: 'BR' },
        '10': { en: 'Morocco', ko: '모로코', flag: '🇲🇦', iso2: 'MA' },
        '11': { en: 'Haiti', ko: '아이티', flag: '🇭🇹', iso2: 'HT' },
        '12': { en: 'Scotland', ko: '스코틀랜드', flag: '🏴\u200D󠁢󠁳󠁣󠁴󠁿', iso2: 'SCO' },
        '13': { en: 'United States', ko: '미국', flag: '🇺🇸', iso2: 'US' },
        '14': { en: 'Paraguay', ko: '파라과이', flag: '🇵🇾', iso2: 'PY' },
        '15': { en: 'Australia', ko: '호주', flag: '🇦🇺', iso2: 'AU' },
        '16': { en: 'Turkey', ko: '튀르키예', flag: '🇹🇷', iso2: 'TR' },
        '17': { en: 'Germany', ko: '독일', flag: '🇩🇪', iso2: 'DE' },
        '18': { en: 'Curaçao', ko: '퀴라소', flag: '🇨🇼', iso2: 'CW' },
        '19': { en: 'Ivory Coast', ko: '코트디부아르', flag: '🇨🇮', iso2: 'CI' },
        '20': { en: 'Ecuador', ko: '에콰도르', flag: '🇪🇨', iso2: 'EC' },
        '21': { en: 'Netherlands', ko: '네덜란드', flag: '🇳🇱', iso2: 'NL' },
        '22': { en: 'Japan', ko: '일본', flag: '🇯🇵', iso2: 'JP' },
        '23': { en: 'Sweden', ko: '스웨덴', flag: '🇸🇪', iso2: 'SE' },
        '24': { en: 'Tunisia', ko: '튀니지', flag: '🇹🇳', iso2: 'TN' },
        '25': { en: 'Belgium', ko: '벨기에', flag: '🇧🇪', iso2: 'BE' },
        '26': { en: 'Egypt', ko: '이집트', flag: '🇪🇬', iso2: 'EG' },
        '27': { en: 'Iran', ko: '이란', flag: '🇮🇷', iso2: 'IR' },
        '28': { en: 'New Zealand', ko: '뉴질랜드', flag: '🇳🇿', iso2: 'NZ' },
        '29': { en: 'Spain', ko: '스페인', flag: '🇪🇸', iso2: 'ES' },
        '30': { en: 'Cape Verde', ko: '카보베르데', flag: '🇨🇻', iso2: 'CV' },
        '31': { en: 'Saudi Arabia', ko: '사우디', flag: '🇸🇦', iso2: 'SA' },
        '32': { en: 'Uruguay', ko: '우루과이', flag: '🇺🇾', iso2: 'UY' },
        '33': { en: 'France', ko: '프랑스', flag: '🇫🇷', iso2: 'FR' },
        '34': { en: 'Senegal', ko: '세네갈', flag: '🇸🇳', iso2: 'SN' },
        '35': { en: 'Iraq', ko: '이라크', flag: '🇮🇶', iso2: 'IQ' },
        '36': { en: 'Norway', ko: '노르웨이', flag: '🇳🇴', iso2: 'NO' },
        '37': { en: 'Argentina', ko: '아르헨티나', flag: '🇦🇷', iso2: 'AR' },
        '38': { en: 'Algeria', ko: '알제리', flag: '🇩🇿', iso2: 'DZ' },
        '39': { en: 'Austria', ko: '오스트리아', flag: '🇦🇹', iso2: 'AT' },
        '40': { en: 'Jordan', ko: '요르단', flag: '🇯🇴', iso2: 'JO' },
        '41': { en: 'Portugal', ko: '포르투갈', flag: '🇵🇹', iso2: 'PT' },
        '42': { en: 'DR Congo', ko: 'DR콩고', flag: '🇨🇩', iso2: 'CD' },
        '43': { en: 'Uzbekistan', ko: '우즈베키스탄', flag: '🇺🇿', iso2: 'UZ' },
        '44': { en: 'Colombia', ko: '콜롬비아', flag: '🇨🇴', iso2: 'CO' },
        '45': { en: 'England', ko: '잉글랜드', flag: '🏴\u200D󠁢󠁥󠁮󠁧󠁿', iso2: 'ENG' },
        '46': { en: 'Croatia', ko: '크로아티아', flag: '🇭🇷', iso2: 'HR' },
        '47': { en: 'Ghana', ko: '가나', flag: '🇬🇭', iso2: 'GH' },
        '48': { en: 'Panama', ko: '파나마', flag: '🇵🇦', iso2: 'PA' },
    };

    const API_BASE = 'https://worldcup26.ir';

    function getTeamFlagUrl(teamId) {
        const team = TEAM_DB[teamId];
        if (!team) return 'https://flagcdn.com/w20/un.png';
        let code = team.iso2.toLowerCase();
        if (code === 'eng') code = 'gb-eng';
        if (code === 'sco') code = 'gb-sct';
        return `https://flagcdn.com/w20/${code}.png`;
    }

    // ===== DOM Elements =====
    const $ = id => document.getElementById(id);
    const consoleOutput = $('console-output');
    const refetchCountdown = $('refetch-countdown');
    const apiRequestCount = $('api-request-count');
    const apiResponseTime = $('api-response-time');
    const simulatorGrid = $('simulator-match-inputs');
    const dataSourceSelect = $('data-source-select');
    const autoRefetchToggle = $('auto-refetch-toggle');
    const resetSimBtn = $('reset-sim-btn');

    // ===== State =====
    let allGamesData = null;
    let predictions = {};
    let settings = {
        dataSource: 'api-football',
        autoRefetch: true,
        apiRequests: 0,
        apiResponseTime: 0,
        countdown: 60,
        forceRefetchToken: ''
    };

    // ===== Initialize =====
    async function init() {
        loadStateFromStorage();
        bindEvents();
        setupStorageListener();
        addLog('제어판 초기화 완료. 메인화면과 연동 중...');
        await fetchGames();
        startLogSync();
        startStatusSync();
    }

    function loadStateFromStorage() {
        // Load predictions
        try {
            predictions = JSON.parse(localStorage.getItem('predictions') || '{}');
        } catch (e) {
            predictions = {};
        }

        // Load settings
        try {
            const storedSettings = JSON.parse(localStorage.getItem('settings'));
            if (storedSettings) {
                settings = Object.assign(settings, storedSettings);
            }
        } catch (e) {}

        // Apply settings to UI elements
        dataSourceSelect.value = settings.dataSource;
        autoRefetchToggle.checked = settings.autoRefetch;
        updateApiStatsUI();
    }

    function saveSettings() {
        localStorage.setItem('settings', JSON.stringify(settings));
    }

    function bindEvents() {
        dataSourceSelect.addEventListener('change', function () {
            settings.dataSource = this.value;
            saveSettings();
            addLog(`설정 변경: 데이터 소스 → ${this.value} (메인화면 실시간 반영)`);
        });

        autoRefetchToggle.addEventListener('change', function () {
            settings.autoRefetch = this.checked;
            saveSettings();
            addLog(`설정 변경: 자동 새로고침 → ${this.checked ? 'ON' : 'OFF'}`);
        });

        const forceRefetchBtn = $('force-refetch-btn');
        if (forceRefetchBtn) {
            forceRefetchBtn.addEventListener('click', function () {
                settings.forceRefetchToken = String(Date.now());
                saveSettings();
                addLog('🔄 수동 API 데이터 동기화 요청 (메인 화면에서 리프레시)');
            });
        }

        resetSimBtn.addEventListener('click', function () {
            predictions = {};
            localStorage.setItem('predictions', JSON.stringify(predictions));
            settings.forceRefetchToken = String(Date.now());
            saveSettings();
            addLog('🔮 모의 입력 데이터 초기화 완료 (메인화면 동기화 & API 재호출)');
            renderSimulatorList();
        });
    }

    function setupStorageListener() {
        window.addEventListener('storage', (e) => {
            if (e.key === 'predictions' && !e.newValue) {
                predictions = {};
                renderSimulatorList();
            } else if (e.key === 'predictions') {
                try {
                    predictions = JSON.parse(e.newValue || '{}');
                    // Update input fields to match new predictions values
                    updateInputFields();
                } catch (err) {}
            }

            if (e.key === 'settings') {
                try {
                    const newSettings = JSON.parse(e.newValue);
                    if (newSettings) {
                        settings = Object.assign(settings, newSettings);
                        dataSourceSelect.value = settings.dataSource;
                        autoRefetchToggle.checked = settings.autoRefetch;
                        updateApiStatsUI();
                    }
                } catch (err) {}
            }
        });
    }

    function updateInputFields() {
        const inputs = simulatorGrid.querySelectorAll('.sim-score-input');
        inputs.forEach(input => {
            const gameId = input.dataset.gameId;
            const isHome = input.classList.contains('home-score');
            const pred = predictions[gameId];
            if (pred !== undefined) {
                input.value = isHome ? pred.homeScore : pred.awayScore;
            } else {
                input.value = '';
            }
        });
    }

    // ===== Fetch Games from API (to populate simulator list) =====
    async function fetchGames() {
        try {
            const res = await fetch(`${API_BASE}/get/games`);
            allGamesData = await res.json();

            // Normalize games data
            let gamesArray = [];
            if (Array.isArray(allGamesData)) {
                gamesArray = allGamesData;
            } else if (allGamesData && Array.isArray(allGamesData.games)) {
                gamesArray = allGamesData.games;
            } else if (allGamesData && typeof allGamesData === 'object') {
                for (const key in allGamesData) {
                    if (Array.isArray(allGamesData[key])) {
                        gamesArray = allGamesData[key];
                        break;
                    }
                }
            }
            allGamesData = { games: gamesArray };

            renderSimulatorList();
        } catch (err) {
            addLog(`❌ 제어판 API 오류: ${err.message}. 데모 경기 목록 로드`);
            loadMockGames();
            renderSimulatorList();
        }
    }

    function loadMockGames() {
        allGamesData = {
            games: [
                { id: '63', group: 'G', home_team_id: '26', away_team_id: '27', home_team_name_en: 'Egypt', away_team_name_en: 'Iran', finished: 'FALSE', time_elapsed: 'notstarted', local_date: '06/26/2026 20:00', type: 'group' },
                { id: '64', group: 'G', home_team_id: '28', away_team_id: '25', home_team_name_en: 'New Zealand', away_team_name_en: 'Belgium', finished: 'FALSE', time_elapsed: 'notstarted', local_date: '06/26/2026 20:00', type: 'group' },
                { id: '65', group: 'H', home_team_id: '30', away_team_id: '31', home_team_name_en: 'Cape Verde', away_team_name_en: 'Saudi Arabia', finished: 'FALSE', time_elapsed: 'notstarted', local_date: '06/26/2026 19:00', type: 'group' },
                { id: '66', group: 'H', home_team_id: '32', away_team_id: '29', home_team_name_en: 'Uruguay', away_team_name_en: 'Spain', finished: 'FALSE', time_elapsed: 'notstarted', local_date: '06/26/2026 18:00', type: 'group' },
                { id: '67', group: 'I', home_team_id: '34', away_team_id: '35', home_team_name_en: 'Senegal', away_team_name_en: 'Iraq', finished: 'FALSE', time_elapsed: 'notstarted', local_date: '06/26/2026 15:00', type: 'group' },
                { id: '68', group: 'I', home_team_id: '36', away_team_id: '33', home_team_name_en: 'Norway', away_team_name_en: 'France', finished: 'FALSE', time_elapsed: 'notstarted', local_date: '06/26/2026 15:00', type: 'group' },
                { id: '69', group: 'J', home_team_id: '38', away_team_id: '39', home_team_name_en: 'Algeria', away_team_name_en: 'Austria', finished: 'FALSE', time_elapsed: 'notstarted', local_date: '06/27/2026 21:00', type: 'group' },
                { id: '70', group: 'J', home_team_id: '40', away_team_id: '37', home_team_name_en: 'Jordan', away_team_name_en: 'Argentina', finished: 'FALSE', time_elapsed: 'notstarted', local_date: '06/27/2026 21:00', type: 'group' },
                { id: '71', group: 'K', home_team_id: '42', away_team_id: '43', home_team_name_en: 'DR Congo', away_team_name_en: 'Uzbekistan', finished: 'FALSE', time_elapsed: 'notstarted', local_date: '06/27/2026 19:30', type: 'group' },
                { id: '72', group: 'K', home_team_id: '44', away_team_id: '41', home_team_name_en: 'Colombia', away_team_name_en: 'Portugal', finished: 'FALSE', time_elapsed: 'notstarted', local_date: '06/27/2026 19:30', type: 'group' },
                { id: '73', group: 'L', home_team_id: '46', away_team_id: '47', home_team_name_en: 'Croatia', away_team_name_en: 'Ghana', finished: 'FALSE', time_elapsed: 'notstarted', local_date: '06/27/2026 17:00', type: 'group' },
                { id: '74', group: 'L', home_team_id: '48', away_team_id: '45', home_team_name_en: 'Panama', away_team_name_en: 'England', finished: 'FALSE', time_elapsed: 'notstarted', local_date: '06/27/2026 17:00', type: 'group' }
            ]
        };
    }

    // ===== Render Simulator Match Inputs =====
    function renderSimulatorList() {
        if (!allGamesData) return;

        const upcomingGames = allGamesData.games.filter(g => {
            if (g.type !== 'group') return false;
            const isFinished = 
                String(g.finished).toUpperCase() === 'TRUE' || 
                g.finished === true || 
                String(g.time_elapsed).toLowerCase() === 'finished';
            return !isFinished;
        });
        
        upcomingGames.sort((a, b) => {
            if (a.group !== b.group) return a.group.localeCompare(b.group);
            return new Date(a.local_date) - new Date(b.local_date);
        });

        simulatorGrid.innerHTML = '';

        if (upcomingGames.length === 0) {
            simulatorGrid.innerHTML = '<div style="grid-column: span 2; text-align: center; color: var(--text-muted); padding: 15px;">모의 예측할 잔여 경기가 없습니다.</div>';
            return;
        }

        upcomingGames.forEach(game => {
            const homeInfo = TEAM_DB[game.home_team_id];
            const awayInfo = TEAM_DB[game.away_team_id];
            
            const homeKo = homeInfo?.ko || game.home_team_name_en;
            const awayKo = awayInfo?.ko || game.away_team_name_en;

            const homeFlagUrl = getTeamFlagUrl(game.home_team_id);
            const awayFlagUrl = getTeamFlagUrl(game.away_team_id);

            const homeVal = predictions[game.id] !== undefined ? predictions[game.id].homeScore : '';
            const awayVal = predictions[game.id] !== undefined ? predictions[game.id].awayScore : '';

            const item = document.createElement('div');
            item.classList.add('sim-match-item');
            item.innerHTML = `
                <span class="sim-group-label">${game.group}조</span>
                <span class="sim-team home" title="${homeKo}"><img src="${homeFlagUrl}" class="team-flag-img" alt="${homeKo}"> ${homeKo}</span>
                <input type="number" class="sim-score-input home-score" min="0" value="${homeVal}" placeholder="-" data-game-id="${game.id}">
                <span class="sim-vs">vs</span>
                <input type="number" class="sim-score-input away-score" min="0" value="${awayVal}" placeholder="-" data-game-id="${game.id}">
                <span class="sim-team away" title="${awayKo}">${awayKo} <img src="${awayFlagUrl}" class="team-flag-img" alt="${awayKo}"></span>
            `;
            simulatorGrid.appendChild(item);
        });

        // Add input event listeners to inputs
        const scoreInputs = simulatorGrid.querySelectorAll('.sim-score-input');
        scoreInputs.forEach(input => {
            input.addEventListener('input', handleScoreInput);
        });
    }

    // ===== Handle Mock Score Input Change =====
    function handleScoreInput() {
        const gameId = this.dataset.gameId;
        const parent = this.closest('.sim-match-item');
        const homeInput = parent.querySelector('.home-score');
        const awayInput = parent.querySelector('.away-score');
        
        const homeVal = homeInput.value.trim();
        const awayVal = awayInput.value.trim();

        const game = allGamesData.games.find(g => g.id === gameId);
        const homeName = TEAM_DB[game.home_team_id]?.ko || game.home_team_name_en;
        const awayName = TEAM_DB[game.away_team_id]?.ko || game.away_team_name_en;

        if (homeVal !== '' && awayVal !== '') {
            predictions[gameId] = {
                homeScore: parseInt(homeVal),
                awayScore: parseInt(awayVal)
            };
            addLog(`🔮 모의 결과 적용: [${game.group}조] ${homeName} ${homeVal} - ${awayVal} ${awayName} (메인 동기화)`);
        } else {
            if (predictions[gameId]) {
                delete predictions[gameId];
                addLog(`🔮 모의 결과 취소: [${game.group}조] ${homeName} vs ${awayName} (메인 동기화)`);
            }
        }

        localStorage.setItem('predictions', JSON.stringify(predictions));
    }

    // ===== Shared Log Synchronization =====
    function startLogSync() {
        // Render initial logs
        renderLogs();

        // Listen for new logs written by index.html in localStorage
        window.addEventListener('storage', (e) => {
            if (e.key === 'shared_logs') {
                renderLogs();
            }
        });
    }

    function renderLogs() {
        let logs = [];
        try {
            logs = JSON.parse(localStorage.getItem('shared_logs') || '[]');
        } catch (e) {
            logs = [];
        }

        consoleOutput.innerHTML = '';
        logs.forEach(log => {
            const entry = document.createElement('div');
            entry.classList.add('log-entry');
            entry.innerHTML = `<span class="log-time">[${log.time}]</span><span class="log-msg">${log.message}</span>`;
            consoleOutput.appendChild(entry);
        });
        consoleOutput.scrollTop = consoleOutput.scrollHeight;
    }

    function addLog(message) {
        const now = new Date();
        const time = `${String(now.getHours()).padStart(2,'0')}:${String(now.getMinutes()).padStart(2,'0')}:${String(now.getSeconds()).padStart(2,'0')}`;
        
        let logs = [];
        try {
            logs = JSON.parse(localStorage.getItem('shared_logs') || '[]');
        } catch (e) {}

        logs.push({ time, message });
        if (logs.length > 80) logs.shift();

        localStorage.setItem('shared_logs', JSON.stringify(logs));
        renderLogs();
    }

    // ===== Status Sync from index.html (API request counts, etc) =====
    function startStatusSync() {
        setInterval(() => {
            try {
                const storedSettings = JSON.parse(localStorage.getItem('settings'));
                if (storedSettings) {
                    settings = Object.assign(settings, storedSettings);
                    updateApiStatsUI();
                }
            } catch (e) {}
        }, 1000);
    }

    function updateApiStatsUI() {
        apiRequestCount.textContent = `${settings.apiRequests || 0} calls`;
        apiResponseTime.textContent = `${settings.apiResponseTime || 0}ms`;
        refetchCountdown.textContent = `${settings.countdown || 60}s left`;
    }

    // ===== Start =====
    document.addEventListener('DOMContentLoaded', init);
})();
