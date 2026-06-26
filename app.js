// ===== 홍명보호 32강 진출 확률 대시보드 - 실시간 API 연동 & 시뮬레이션 =====

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
        '12': { en: 'Scotland', ko: '스코틀랜드', flag: '🏴󠁧󠁢󠁳󠁣󠁴󠁿', iso2: 'SCO' },
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
        '45': { en: 'England', ko: '잉글랜드', flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', iso2: 'ENG' },
        '46': { en: 'Croatia', ko: '크로아티아', flag: '🇭🇷', iso2: 'HR' },
        '47': { en: 'Ghana', ko: '가나', flag: '🇬🇭', iso2: 'GH' },
        '48': { en: 'Panama', ko: '파나마', flag: '🇵🇦', iso2: 'PA' },
    };

    const KOREA_TEAM_ID = '3';
    const KOREA_GROUP = 'A';
    const API_BASE = 'https://worldcup26.ir';

    function getTeamFlagUrl(teamId) {
        const team = TEAM_DB[teamId];
        if (!team) return 'https://flagcdn.com/w20/un.png';
        let code = team.iso2.toLowerCase();
        if (code === 'eng') code = 'gb-eng';
        if (code === 'sco') code = 'gb-sct';
        return `https://flagcdn.com/w20/${code}.png`;
    }

    // ===== Coach Expression 5 Stages =====
    const COACH_STAGES = [
        { min: 100, label: '진출',  key: 'qualified',  img: 'assets/images/hong-qualified.png' },
        { min: 60,  label: '긍정',  key: 'positive',   img: 'assets/images/hong-positive.png' },
        { min: 40,  label: '반반',  key: 'fiftyfifty',  img: 'assets/images/hong-fiftyfifty.png' },
        { min: 20,  label: '위기',  key: 'crisis',     img: 'assets/images/hong-crisis.png' },
        { min: 0,   label: '탈락',  key: 'eliminated', img: 'assets/images/hong-eliminated.png' },
    ];

    // ===== Mock Game Matches Data =====
    const MOCK_GAMES = [
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
    ];

    // ===== DOM Elements =====
    const $ = id => document.getElementById(id);
    const gaugeBar = $('gauge-bar');
    const gaugePointer = $('gauge-pointer');
    const gaugeValueTip = $('gauge-value-tip');
    const probValue = $('probability-value');
    const coachImg = $('coach-expression-img');
    const statusText = $('expression-status-text');
    const standingsTbody = $('standings-tbody');
    const teamsAboveEl = $('teams-above');
    const teamsBelowEl = $('teams-below');
    const scenarioMatchList = $('scenario-match-list');
    const openControlBtn = $('open-control-btn');

    // ===== State =====
    let currentStageKey = '';
    let animFrameId = null;
    let apiCallCount = 0;
    let allGroupsData = null;
    let allGamesData = null;
    let koreaStats = { pts: 3, gd: -1, gf: 2, mp: 3 }; // Fallback values
    let predictions = {}; // User-defined mock predictions: gameId -> { homeScore, awayScore }
    let settings = {
        dataSource: 'api-football',
        autoRefetch: true,
        apiRequests: 0,
        apiResponseTime: 0,
        countdown: 60
    };

    // ===== Initialize =====
    async function init() {
        startClock();
        loadStateFromStorage();
        setupStorageListener();
        bindEvents();
        addLog('대시보드 초기화 중...');
        await fetchAllData();
        startCountdown();
    }

    function loadStateFromStorage() {
        try {
            predictions = JSON.parse(localStorage.getItem('predictions') || '{}');
        } catch (e) {
            predictions = {};
        }

        try {
            const storedSettings = JSON.parse(localStorage.getItem('settings'));
            if (storedSettings) {
                settings = Object.assign(settings, storedSettings);
            }
        } catch (e) {}
    }

    function saveSettings() {
        localStorage.setItem('settings', JSON.stringify(settings));
    }

    function setupStorageListener() {
        window.addEventListener('storage', (e) => {
            if (e.key === 'predictions') {
                try {
                    predictions = JSON.parse(e.newValue || '{}');
                    processData();
                } catch (err) {}
            }
            if (e.key === 'settings') {
                try {
                    const oldSource = settings.dataSource;
                    const newSettings = JSON.parse(e.newValue);
                    if (newSettings) {
                        settings = Object.assign(settings, newSettings);
                        if (settings.dataSource !== oldSource) {
                            fetchAllData();
                        }
                    }
                } catch (err) {}
            }
        });
    }

    function bindEvents() {
        if (openControlBtn) {
            openControlBtn.addEventListener('click', function () {
                window.open('control.html', 'SimulatorControl', 'width=1120,height=360,resizable=yes,scrollbars=yes');
            });
        }
    }

    // ===== API Fetching =====
    async function fetchAllData() {
        addLog('API 데이터 로딩 중...');
        const startTime = performance.now();
        
        try {
            const [groupsRes, gamesRes] = await Promise.all([
                fetch(`${API_BASE}/get/groups`),
                fetch(`${API_BASE}/get/games`)
            ]);

            allGroupsData = await groupsRes.json();
            allGamesData = await gamesRes.json();

            apiCallCount += 2;
            const elapsed = Math.round(performance.now() - startTime);

            settings.apiRequests = apiCallCount;
            settings.apiResponseTime = elapsed;
            saveSettings();

            // 백필(Backfill) 로직: API 결과에 누락된 경기 목록을 MOCK_GAMES에서 보완
            if (allGamesData && allGamesData.games) {
                MOCK_GAMES.forEach(mockGame => {
                    const exists = allGamesData.games.some(g => g.id === mockGame.id);
                    if (!exists) {
                        allGamesData.games.push(mockGame);
                    }
                });
            }

            addLog(`API 응답 완료 (${elapsed}ms). 그룹 ${allGroupsData.groups.length}개, 경기 ${allGamesData.games?.length || 0}개 로드`);
            
            processData();
        } catch (err) {
            addLog(`❌ API 오류: ${err.message}. 데모 데이터 시뮬레이션 적용`);
            loadMockData();
            processData();
        }
    }

    // ===== Fallback Mock Data =====
    function loadMockData() {
        allGroupsData = {
            groups: [
                { name: 'A', teams: [
                    { team_id: '1', mp: '3', pts: '9', gd: '6', gf: '6' },
                    { team_id: '2', mp: '3', pts: '4', gd: '-1', gf: '2' },
                    { team_id: '3', mp: '3', pts: '3', gd: '-1', gf: '2' },
                    { team_id: '4', mp: '3', pts: '1', gd: '-4', gf: '2' }
                ]},
                { name: 'B', teams: [
                    { team_id: '5', mp: '3', pts: '7', gd: '3', gf: '5' },
                    { team_id: '6', mp: '3', pts: '4', gd: '-1', gf: '5' },
                    { team_id: '7', mp: '3', pts: '3', gd: '-1', gf: '3' },
                    { team_id: '8', mp: '3', pts: '1', gd: '-1', gf: '2' }
                ]},
                { name: 'C', teams: [
                    { team_id: '9', mp: '3', pts: '9', gd: '4', gf: '5' },
                    { team_id: '10', mp: '3', pts: '4', gd: '1', gf: '3' },
                    { team_id: '12', mp: '3', pts: '3', gd: '-3', gf: '1' },
                    { team_id: '11', mp: '3', pts: '1', gd: '-2', gf: '2' }
                ]},
                { name: 'D', teams: [
                    { team_id: '13', mp: '3', pts: '7', gd: '4', gf: '6' },
                    { team_id: '15', mp: '3', pts: '4', gd: '0', gf: '3' },
                    { team_id: '14', mp: '3', pts: '4', gd: '-2', gf: '2' },
                    { team_id: '16', mp: '3', pts: '1', gd: '-2', gf: '1' }
                ]},
                { name: 'E', teams: [
                    { team_id: '17', mp: '3', pts: '9', gd: '5', gf: '7' },
                    { team_id: '18', mp: '3', pts: '4', gd: '1', gf: '3' },
                    { team_id: '20', mp: '3', pts: '4', gd: '0', gf: '2' },
                    { team_id: '19', mp: '3', pts: '0', gd: '-6', gf: '1' }
                ]},
                { name: 'F', teams: [
                    { team_id: '21', mp: '3', pts: '7', gd: '3', gf: '6' },
                    { team_id: '22', mp: '3', pts: '4', gd: '1', gf: '4' },
                    { team_id: '23', mp: '3', pts: '4', gd: '0', gf: '7' },
                    { team_id: '24', mp: '3', pts: '1', gd: '-4', gf: '2' }
                ]},
                { name: 'G', teams: [
                    { team_id: '26', mp: '2', pts: '4', gd: '1', gf: '3' }, // Egypt (Promoted to 1st)
                    { team_id: '25', mp: '2', pts: '2', gd: '0', gf: '2' }, // Belgium (Corrected to 2 Draws)
                    { team_id: '27', mp: '2', pts: '2', gd: '0', gf: '2' }, // Iran (2 Draws)
                    { team_id: '28', mp: '2', pts: '1', gd: '-1', gf: '2' } // New Zealand (1 Draw 1 Loss)
                ]},
                { name: 'H', teams: [
                    { team_id: '29', mp: '2', pts: '4', gd: '2', gf: '3' },
                    { team_id: '30', mp: '2', pts: '3', gd: '0', gf: '2' },
                    { team_id: '31', mp: '2', pts: '2', gd: '-1', gf: '2' },
                    { team_id: '32', mp: '2', pts: '1', gd: '-1', gf: '2' }
                ]},
                { name: 'I', teams: [
                    { team_id: '33', mp: '2', pts: '6', gd: '4', gf: '5' },
                    { team_id: '36', mp: '2', pts: '4', gd: '1', gf: '3' },
                    { team_id: '34', mp: '2', pts: '1', gd: '-2', gf: '2' },
                    { team_id: '35', mp: '2', pts: '0', gd: '-3', gf: '1' }
                ]},
                { name: 'J', teams: [
                    { team_id: '37', mp: '2', pts: '6', gd: '4', gf: '5' },
                    { team_id: '38', mp: '2', pts: '3', gd: '-1', gf: '2' },
                    { team_id: '39', mp: '2', pts: '1', gd: '-1', gf: '2' },
                    { team_id: '40', mp: '2', pts: '1', gd: '-2', gf: '1' }
                ]},
                { name: 'K', teams: [
                    { team_id: '41', mp: '2', pts: '4', gd: '2', gf: '3' },
                    { team_id: '42', mp: '2', pts: '2', gd: '0', gf: '2' },
                    { team_id: '43', mp: '2', pts: '2', gd: '-1', gf: '1' },
                    { team_id: '44', mp: '2', pts: '1', gd: '-1', gf: '1' }
                ]},
                { name: 'L', teams: [
                    { team_id: '45', mp: '2', pts: '4', gd: '1', gf: '2' },
                    { team_id: '46', mp: '2', pts: '3', gd: '0', gf: '2' },
                    { team_id: '47', mp: '2', pts: '2', gd: '-1', gf: '1' },
                    { team_id: '48', mp: '2', pts: '1', gd: '0', gf: '2' }
                ]}
            ]
        };

        allGamesData = {
            games: JSON.parse(JSON.stringify(MOCK_GAMES))
        };
    }

    // ===== Process Data =====
    function processData() {
        if (!allGroupsData) return;

        // Clone base data to apply mock predictions
        const simGroups = JSON.parse(JSON.stringify(allGroupsData.groups));
        const simGames = JSON.parse(JSON.stringify(allGamesData.games));

        // Debug logging for Group I
        const debugGroup = simGroups.find(g => g.name === 'I');
        if (debugGroup) {
            const debugTeams = debugGroup.teams.map(t => `${TEAM_DB[t.team_id]?.ko || t.team_id}(mp:${t.mp},pts:${t.pts},gd:${t.gd})`).join(', ');
            const debugGames = simGames.filter(g => g.group === 'I').map(g => `${TEAM_DB[g.home_team_id]?.ko || g.home_team_id} vs ${TEAM_DB[g.away_team_id]?.ko || g.away_team_id}(finished:${g.finished})`).join(', ');
            addLog(`⚙️ DEBUG I조 팀: [${debugTeams}] / 경기: [${debugGames}]`);
        }

        // Apply predictions to simulated group stats
        Object.keys(predictions).forEach(gameId => {
            const pred = predictions[gameId];
            const game = simGames.find(g => g.id === gameId);
            if (!game) return;

            game.finished = 'TRUE';
            game.home_score = String(pred.homeScore);
            game.away_score = String(pred.awayScore);
            game.time_elapsed = 'finished';

            const group = simGroups.find(g => g.name === game.group);
            if (!group) return;

            const homePts = pred.homeScore > pred.awayScore ? 3 : (pred.homeScore === pred.awayScore ? 1 : 0);
            const awayPts = pred.awayScore > pred.homeScore ? 3 : (pred.homeScore === pred.awayScore ? 1 : 0);

            updateTeamStats(group, game.home_team_id, homePts, pred.homeScore, pred.awayScore);
            updateTeamStats(group, game.away_team_id, awayPts, pred.awayScore, pred.homeScore);
        });

        // Helper to update team stats based on prediction
        function updateTeamStats(group, teamId, pts, gf, ga) {
            const team = group.teams.find(t => t.team_id === teamId);
            if (!team) return;

            const w = pts === 3 ? 1 : 0;
            const d = pts === 1 ? 1 : 0;
            const l = pts === 0 ? 1 : 0;

            team.mp = String(parseInt(team.mp) + 1);
            team.w = String(parseInt(team.w) + w);
            team.d = String(parseInt(team.d) + d);
            team.l = String(parseInt(team.l) + l);
            team.pts = String(parseInt(team.pts) + pts);
            team.gf = String(parseInt(team.gf) + gf);
            team.ga = String(parseInt(team.ga) + ga);
            team.gd = String(parseInt(team.gd) + (gf - ga));
        }

        // 1. Find Korea's stats
        const koreaGroup = simGroups.find(g => g.name === KOREA_GROUP);
        const koreaTeam = koreaGroup.teams.find(t => t.team_id === KOREA_TEAM_ID);
        koreaStats = {
            pts: parseInt(koreaTeam.pts),
            gd: parseInt(koreaTeam.gd),
            gf: parseInt(koreaTeam.gf),
            mp: parseInt(koreaTeam.mp),
            group: KOREA_GROUP,
        };

        // 2. Determine Korea's rank in its group
        const koreaGroupSorted = [...koreaGroup.teams].sort((a, b) => {
            const ptsDiff = parseInt(b.pts) - parseInt(a.pts);
            if (ptsDiff !== 0) return ptsDiff;
            const gdDiff = parseInt(b.gd) - parseInt(a.gd);
            if (gdDiff !== 0) return gdDiff;
            return parseInt(b.gf) - parseInt(a.gf);
        });
        const koreaRankInGroup = koreaGroupSorted.findIndex(t => t.team_id === KOREA_TEAM_ID) + 1;

        // 3. Collect all 3rd place teams from other groups
        const thirdPlaceTeams = [];
        
        simGroups.forEach(group => {
            const sorted = [...group.teams].sort((a, b) => {
                const ptsDiff = parseInt(b.pts) - parseInt(a.pts);
                if (ptsDiff !== 0) return ptsDiff;
                const gdDiff = parseInt(b.gd) - parseInt(a.gd);
                if (gdDiff !== 0) return gdDiff;
                return parseInt(b.gf) - parseInt(a.gf);
            });

            const isGroupFinished = sorted.every(t => parseInt(t.mp) >= 3);
            const thirdTeam = sorted[2]; // 3rd place (0-indexed)

            if (group.name === KOREA_GROUP) {
                thirdPlaceTeams.push({
                    team_id: thirdTeam.team_id,
                    group: group.name,
                    pts: parseInt(thirdTeam.pts),
                    gd: parseInt(thirdTeam.gd),
                    gf: parseInt(thirdTeam.gf),
                    isKorea: true,
                    isFinished: isGroupFinished,
                    allTeams: sorted,
                    possibleThirds: null,
                });
            } else {
                if (isGroupFinished) {
                    thirdPlaceTeams.push({
                        team_id: thirdTeam.team_id,
                        group: group.name,
                        pts: parseInt(thirdTeam.pts),
                        gd: parseInt(thirdTeam.gd),
                        gf: parseInt(thirdTeam.gf),
                        isKorea: false,
                        isFinished: true,
                        possibleThirds: null,
                    });
                } else {
                    const possibles = runGroupSimulation(group, sorted, simGames);
                    thirdPlaceTeams.push({
                        team_id: thirdTeam.team_id,
                        group: group.name,
                        pts: parseInt(thirdTeam.pts),
                        gd: parseInt(thirdTeam.gd),
                        gf: parseInt(thirdTeam.gf),
                        isKorea: false,
                        isFinished: false,
                        possibleThirds: possibles,
                    });
                }
            }
        });

        // 4. Calculate overall probability
        const { probability, conditions } = calculateProbability(thirdPlaceTeams);

        // 5. Update UI
        updateDashboard(probability);

        renderStandings(thirdPlaceTeams, conditions, simGames);
        renderScenarioPanel(thirdPlaceTeams, simGames);
    }

    // ===== Run 9-Outcome Group Simulation =====
    function runGroupSimulation(group, currentSortedTeams, simGames) {
        const groupGames = simGames.filter(g => g.group === group.name && g.finished !== 'TRUE');
        if (groupGames.length === 0) {
            return [];
        }

        const outcomes = [
            { h: 3, a: 0 },
            { h: 1, a: 1 },
            { h: 0, a: 3 }
        ];

        const candidatesMap = {};

        const evaluateScenario = (scenarioTeams) => {
            scenarioTeams.sort((a, b) => {
                if (b.pts !== a.pts) return b.pts - a.pts;
                if (b.gd !== a.gd) return b.gd - a.gd;
                if (b.gf !== a.gf) return b.gf - a.gf;
                return a.team_id.localeCompare(b.team_id);
            });

            const third = scenarioTeams[2];
            if (!candidatesMap[third.team_id]) {
                candidatesMap[third.team_id] = {
                    team_id: third.team_id,
                    currentPts: parseInt(group.teams.find(t => t.team_id === third.team_id).pts),
                    currentGd: parseInt(group.teams.find(t => t.team_id === third.team_id).gd),
                    currentGf: parseInt(group.teams.find(t => t.team_id === third.team_id).gf),
                    mp: parseInt(group.teams.find(t => t.team_id === third.team_id).mp),
                    scenariosCount: 0,
                    wins: 0,
                    losses: 0,
                    equals: 0
                };
            }

            candidatesMap[third.team_id].scenariosCount++;

            if (third.pts < koreaStats.pts) {
                candidatesMap[third.team_id].wins++;
            } else if (third.pts > koreaStats.pts) {
                candidatesMap[third.team_id].losses++;
            } else {
                if (third.gd < koreaStats.gd) {
                    candidatesMap[third.team_id].wins++;
                } else if (third.gd > koreaStats.gd) {
                    candidatesMap[third.team_id].losses++;
                } else {
                    if (third.gf < koreaStats.gf) {
                        candidatesMap[third.team_id].wins++;
                    } else if (third.gf > koreaStats.gf) {
                        candidatesMap[third.team_id].losses++;
                    } else {
                        candidatesMap[third.team_id].equals++;
                    }
                }
            }
        };

        const cloneTeam = (t) => ({
            team_id: t.team_id,
            mp: parseInt(t.mp),
            w: parseInt(t.w),
            d: parseInt(t.d),
            l: parseInt(t.l),
            pts: parseInt(t.pts),
            gf: parseInt(t.gf),
            ga: parseInt(t.ga),
            gd: parseInt(t.gd)
        });

        if (groupGames.length === 2) {
            const g1 = groupGames[0];
            const g2 = groupGames[1];
            for (const o1 of outcomes) {
                for (const o2 of outcomes) {
                    const teams = group.teams.map(cloneTeam);
                    applyOutcome(teams, g1.home_team_id, g1.away_team_id, o1.h, o1.a);
                    applyOutcome(teams, g2.home_team_id, g2.away_team_id, o2.h, o2.a);
                    evaluateScenario(teams);
                }
            }
        } else if (groupGames.length === 1) {
            const g1 = groupGames[0];
            for (const o1 of outcomes) {
                const teams = group.teams.map(cloneTeam);
                applyOutcome(teams, g1.home_team_id, g1.away_team_id, o1.h, o1.a);
                evaluateScenario(teams);
            }
        }
        return Object.values(candidatesMap);
    }

    function applyOutcome(teams, homeId, awayId, homePts, awayPts) {
        const home = teams.find(t => t.team_id === homeId);
        const away = teams.find(t => t.team_id === awayId);
        if (!home || !away) return;

        home.mp += 1;
        away.mp += 1;
        home.pts += homePts;
        away.pts += awayPts;

        // Simple GD and GF update for simulation (assuming 1-0 or 0-0 or 0-1 score)
        if (homePts === 3) {
            home.w += 1; home.gd += 1; home.gf += 1;
            away.l += 1; away.gd -= 1; away.ga += 1;
        } else if (homePts === 1) {
            home.d += 1;
            away.d += 1;
        } else {
            away.w += 1; away.gd += 1; away.gf += 1;
            home.l += 1; home.gd -= 1; home.ga += 1;
        }
    }

    // ===== Calculate Probability =====
    function calculateProbability(thirdPlaceTeams) {
        const conditions = [];
        let teamsAbove = 0;
        let teamsBelow = 0;
        const groupAheadProbabilities = [];

        thirdPlaceTeams.forEach(team => {
            if (team.isKorea) return;

            if (team.isFinished) {
                const cmp = compareWithKorea(team);
                if (cmp === 'above') {
                    teamsAbove++;
                    groupAheadProbabilities.push(0);
                    conditions.push({
                        team_id: team.team_id,
                        group: team.group,
                        status: 'above',
                        met: false,
                        settled: true,
                        text: `승점 ${team.pts}, 득실차 ${team.gd > 0 ? '+' : ''}${team.gd}, 다득점 ${team.gf} → 한국보다 상위`
                    });
                } else {
                    teamsBelow++;
                    groupAheadProbabilities.push(1);
                    conditions.push({
                        team_id: team.team_id,
                        group: team.group,
                        status: 'below',
                        met: true,
                        settled: true,
                        text: getDefeatConditionText(team)
                    });
                }
            } else {
                let totalGroupScenarios = 0;
                let koreaWinsScenarios = 0;
                
                team.possibleThirds.forEach(candidate => {
                    totalGroupScenarios += candidate.scenariosCount;
                    koreaWinsScenarios += candidate.wins;
                });

                const probAhead = totalGroupScenarios > 0 ? (koreaWinsScenarios / totalGroupScenarios) : 0.5;
                groupAheadProbabilities.push(probAhead);

                if (probAhead === 1) {
                    let canChase = false;
                    team.possibleThirds.forEach(cand => {
                        const rem = 3 - cand.mp;
                        const maxPts = cand.currentPts + rem * 3;
                        if (maxPts >= koreaStats.pts) {
                            canChase = true;
                        }
                    });

                    if (canChase) {
                        conditions.push({
                            team_id: team.team_id,
                            group: team.group,
                            status: 'uncertain',
                            met: null,
                            settled: false,
                            text: `3위 후보 결과 및 득실차에 따라 변동 가능 (대승 시 한국 추월 가능)`
                        });
                    } else {
                        teamsBelow++;
                        const condText = getGroupDefeatConditionText(team);
                        conditions.push({
                            team_id: team.team_id,
                            group: team.group,
                            status: 'below-uncertain',
                            met: true,
                            settled: false,
                            text: condText
                        });
                    }
                } else if (probAhead === 0) {
                    teamsAbove++;
                    conditions.push({
                        team_id: team.team_id,
                        group: team.group,
                        status: 'above-uncertain',
                        met: false,
                        settled: false,
                        text: `3위 후보 모두 최종 3위 달성 시 한국보다 우위 확정 (실패)`
                    });
                } else {
                    conditions.push({
                        team_id: team.team_id,
                        group: team.group,
                        status: 'uncertain',
                        met: null,
                        settled: false,
                        text: `3위 후보 결과에 따라 변동 가능 (한국 우위 확률: ${(probAhead * 100).toFixed(0)}%)`
                    });
                }
            }
        });

        let probability = calculateOverallPercentage(groupAheadProbabilities, 4);
        probability = Math.min(100, Math.max(0, probability));

        return { probability, conditions };
    }

    function calculateOverallPercentage(probs, k) {
        const n = probs.length;
        let dp = new Array(n + 1).fill(0).map(() => new Array(n + 1).fill(0));
        dp[0][0] = 1.0;

        for (let i = 1; i <= n; i++) {
            const p = probs[i - 1];
            for (let j = 0; j <= i; j++) {
                dp[i][j] = dp[i - 1][j] * (1 - p);
                if (j > 0) {
                    dp[i][j] += dp[i - 1][j - 1] * p;
                }
            }
        }

        let totalProb = 0;
        for (let j = k; j <= n; j++) {
            totalProb += dp[n][j];
        }

        return totalProb * 100;
    }

    // ===== Compare Team with Korea =====
    function compareWithKorea(team) {
        if (team.pts > koreaStats.pts) return 'above';
        if (team.pts < koreaStats.pts) return 'below';
        if (team.gd > koreaStats.gd) return 'above';
        if (team.gd < koreaStats.gd) return 'below';
        if (team.gf > koreaStats.gf) return 'above';
        if (team.gf < koreaStats.gf) return 'below';
        return 'equal';
    }

    // ===== Condition Text Generators =====
    function getDefeatConditionText(team) {
        const reasons = [];
        if (team.pts < koreaStats.pts) {
            reasons.push(`승점 ${team.pts} < 한국 ${koreaStats.pts}`);
        } else if (team.pts === koreaStats.pts) {
            if (team.gd < koreaStats.gd) {
                reasons.push(`득실차 ${team.gd} < 한국 ${koreaStats.gd}`);
            } else if (team.gd === koreaStats.gd && team.gf < koreaStats.gf) {
                reasons.push(`다득점 ${team.gf} < 한국 ${koreaStats.gf}`);
            } else if (team.gd === koreaStats.gd && team.gf === koreaStats.gf) {
                reasons.push(`동점·동득실·동다득점 (페어플레이/추첨)`);
            }
        }
        return reasons.length > 0 ? reasons.join(', ') : '한국보다 하위';
    }

    function getGroupDefeatConditionText(team) {
        const parts = [];
        team.possibleThirds.forEach(cand => {
            const teamInfo = TEAM_DB[cand.team_id];
            const name = teamInfo?.ko || cand.team_id;
            const rem = 3 - cand.mp;

            if (cand.currentPts + rem * 3 < koreaStats.pts) {
                return;
            }

            // Check if a draw (1 pt) is already enough to overtake Korea (pts: 3, gd: -1, gf: 2)
            const drawPts = cand.currentPts + 1;
            const drawGd = cand.currentGd;
            const drawGf = cand.currentGf;
            
            let isDrawEnoughToOvertake = false;
            if (drawPts > koreaStats.pts) {
                isDrawEnoughToOvertake = true;
            } else if (drawPts === koreaStats.pts) {
                if (drawGd > koreaStats.gd) {
                    isDrawEnoughToOvertake = true;
                } else if (drawGd === koreaStats.gd && drawGf > koreaStats.gf) {
                    isDrawEnoughToOvertake = true;
                }
            }

            if (isDrawEnoughToOvertake) {
                // If a draw is enough to overtake us, they must LOSE (defeat) for us to stay ahead
                parts.push(`${name} 패배`);
            } else {
                // Otherwise, they need to win to overtake us, so we stay ahead if they draw or lose
                let minMargin = null;
                for (let m = 1; m <= 20; m++) {
                    const finalGd = cand.currentGd + m;
                    const finalGf = cand.currentGf + m;
                    if (finalGd > koreaStats.gd || (finalGd === koreaStats.gd && finalGf > koreaStats.gf)) {
                        minMargin = m;
                        break;
                    }
                }

                if (minMargin !== null) {
                    if (minMargin === 1) {
                        parts.push(`${name} 무승부 이하`);
                    } else {
                        parts.push(`${name} ${minMargin - 1}골 차 이하 승리 또는 무승부 이하`);
                    }
                }
            }
        });

        if (parts.length > 0) {
            return parts.join(' 및 ') + ' (성공)';
        }
        return '3위 후보 모두 최종 3위 달성 시 한국보다 뒤처짐 확정 (성공)';
    }

    // ===== Render Standings Table =====
    function renderStandings(thirdPlaceTeams, conditions, simGames) {
        standingsTbody.innerHTML = '';

        const korea = thirdPlaceTeams.find(t => t.isKorea);
        const others = thirdPlaceTeams.filter(t => !t.isKorea);

        others.sort((a, b) => {
            const ptsDiff = b.pts - a.pts;
            if (ptsDiff !== 0) return ptsDiff;
            const gdDiff = b.gd - a.gd;
            if (gdDiff !== 0) return gdDiff;
            const gfDiff = b.gf - a.gf;
            if (gfDiff !== 0) return gfDiff;
            return a.group.localeCompare(b.group);
        });

        let koreaInsertIndex = others.length;
        for (let i = 0; i < others.length; i++) {
            const cmp = compareWithKorea(others[i]);
            if (cmp === 'below' || cmp === 'equal') {
                koreaInsertIndex = i;
                break;
            }
        }

        const allTeams = [...others];
        allTeams.splice(koreaInsertIndex, 0, korea);

        let aboveCount = 0;
        let belowCount = 0;
        let koreaFound = false;

        allTeams.forEach((team, idx) => {
            if (team.isKorea) {
                koreaFound = true;
            } else if (!koreaFound) {
                aboveCount++;
            } else {
                belowCount++;
            }

            const rank = idx + 1;
            const teamInfo = TEAM_DB[team.team_id];
            const cond = conditions.find(c => c.group === team.group);

            const tr = document.createElement('tr');
            if (team.isKorea) {
                tr.classList.add('row-korea');
            } else if (team.isFinished) {
                tr.classList.add('row-finished-compact');
            }
            
            if (rank === 8) tr.classList.add('row-cutoff');
            if (rank > 8 && !team.isKorea) tr.classList.add('row-eliminated-zone');

            // Rank
            const tdRank = document.createElement('td');
            tdRank.classList.add('col-rank');
            tdRank.innerHTML = `<strong>${rank}</strong>`;
            if (rank <= 8) {
                tdRank.innerHTML += ' <span class="qualify-dot">●</span>';
            }
            tr.appendChild(tdRank);

            // Group
            const tdGroup = document.createElement('td');
            tdGroup.classList.add('col-group');
            tdGroup.textContent = team.group;
            tr.appendChild(tdGroup);

            // Team
            const tdTeam = document.createElement('td');
            tdTeam.classList.add('col-team');
            const flagUrl = getTeamFlagUrl(team.team_id);
            tdTeam.innerHTML = `<span class="team-cell"><img src="${flagUrl}" class="team-flag-img" alt="${teamInfo?.ko}"> <span>${teamInfo?.ko || '?'}</span></span>`;
            tr.appendChild(tdTeam);

            // Status
            const tdStatus = document.createElement('td');
            tdStatus.classList.add('col-status');
            tdStatus.innerHTML = getGroupStatusHtml(team.group, team.isKorea, team.isFinished, simGames);
            tr.appendChild(tdStatus);

            // Points
            const tdPoints = document.createElement('td');
            tdPoints.classList.add('col-points');
            tdPoints.innerHTML = `<strong>${team.pts}</strong>`;
            tr.appendChild(tdPoints);

            // GD
            const tdGd = document.createElement('td');
            tdGd.classList.add('col-gd');
            const gdClass = team.gd > 0 ? 'gd-positive' : team.gd < 0 ? 'gd-negative' : 'gd-zero';
            const gdPrefix = team.gd > 0 ? '+' : '';
            tdGd.innerHTML = `<span class="${gdClass}">${gdPrefix}${team.gd}</span>`;
            tr.appendChild(tdGd);

            // GF
            const tdGf = document.createElement('td');
            tdGf.classList.add('col-gf');
            tdGf.innerHTML = `<strong>${team.gf}</strong>`;
            tr.appendChild(tdGf);

            // Condition column
            const tdCond = document.createElement('td');
            tdCond.classList.add('col-condition');
            
            if (team.isKorea) {
                tdCond.innerHTML = `<span class="cond-korea">— (한국 성적: 3점, 득실차 -1, 다득점 2)</span>`;
            } else if (team.isFinished) {
                const textClass = cond.met === true ? 'text-met' : 'text-failed';
                const icon = cond.met === true ? '✅' : '❌';
                const statusLabel = cond.met === true ? '충족' : '실패';
                tdCond.innerHTML = `<div class="cond-simple-text ${textClass}">${icon} <strong>${statusLabel}</strong>: ${cond.text}</div>`;
            } else if (cond) {
                const condClass = cond.met === true ? 'cond-met' : cond.met === false ? 'cond-failed' : 'cond-pending';
                const icon = cond.met === true ? '✅' : cond.met === false ? '❌' : '⏳';
                const statusLabel = cond.met === true ? '충족' : cond.met === false ? '실패' : '미확정';
                
                let condHtml = `<div class="cond-wrapper ${condClass}">`;
                condHtml += `<div class="cond-status">${icon} <strong>${statusLabel}</strong></div>`;
                condHtml += `<div class="cond-detail">${cond.text}</div>`;
                
                if (team.possibleThirds) {
                    condHtml += `<div class="cond-candidates">`;
                    team.possibleThirds.forEach(p => {
                        const pInfo = TEAM_DB[p.team_id];
                        const microClass = p.wins === p.scenariosCount ? 'badge-micro-success' : (p.losses === p.scenariosCount ? 'badge-micro-failed' : 'badge-micro-pending');
                        const microLabel = p.wins === p.scenariosCount ? '우위' : (p.losses === p.scenariosCount ? '열세' : '경합');
                        const condSummary = getCandidateSummaryText(p);

                        condHtml += `<div class="candidate-row">`;
                        const candFlagUrl = getTeamFlagUrl(p.team_id);
                        condHtml += `<span class="candidate-team"><img src="${candFlagUrl}" class="team-flag-img" alt="${pInfo?.ko}"> ${pInfo?.ko || '?'} (${p.currentPts}점)</span>`;
                        condHtml += `<span class="candidate-cond-text">${condSummary}</span>`;
                        condHtml += `<span class="candidate-badge-micro ${microClass}">${microLabel}</span>`;
                        condHtml += `</div>`;
                    });
                    condHtml += `</div>`;
                }
                
                condHtml += `</div>`;
                tdCond.innerHTML = condHtml;
            }
            tr.appendChild(tdCond);

            // Accordion click toggle logic for mobile viewport
            if (!team.isKorea) {
                tr.addEventListener('click', function () {
                    if (window.innerWidth > 768) return; // Keep default layout on desktop

                    const nextRow = tr.nextElementSibling;
                    if (nextRow && nextRow.classList.contains('row-detail-mobile')) {
                        // Already open, close it
                        nextRow.remove();
                    } else {
                        // Close any other open mobile details first
                        document.querySelectorAll('.row-detail-mobile').forEach(r => r.remove());

                        // Create detailed accordion row
                        const detailTr = document.createElement('tr');
                        detailTr.classList.add('row-detail-mobile');

                        const detailTd = document.createElement('td');
                        detailTd.setAttribute('colspan', '7'); // Rank, Group, Team, Status, Pts, GD, GF = 7 columns

                        let condHtml = '';
                        if (team.isFinished) {
                            const textClass = cond.met === true ? 'text-met' : 'text-failed';
                            const icon = cond.met === true ? '✅' : '❌';
                            const statusLabel = cond.met === true ? '충족' : '실패';
                            condHtml = `<div class="mobile-cond-container cond-simple-text ${textClass}">${icon} <strong>${statusLabel}</strong>: ${cond.text}</div>`;
                        } else if (cond) {
                            const condClass = cond.met === true ? 'cond-met' : cond.met === false ? 'cond-failed' : 'cond-pending';
                            const icon = cond.met === true ? '✅' : cond.met === false ? '❌' : '⏳';
                            const statusLabel = cond.met === true ? '충족' : cond.met === false ? '실패' : '미확정';

                            condHtml = `<div class="mobile-cond-container cond-wrapper ${condClass}">`;
                            condHtml += `<div class="cond-status">${icon} <strong>${statusLabel}</strong></div>`;
                            condHtml += `<div class="cond-detail" style="font-size: 0.72rem; margin-bottom: 5px;">${cond.text}</div>`;

                            if (team.possibleThirds) {
                                condHtml += `<div class="cond-candidates">`;
                                team.possibleThirds.forEach(p => {
                                    const pInfo = TEAM_DB[p.team_id];
                                    const microClass = p.wins === p.scenariosCount ? 'badge-micro-success' : (p.losses === p.scenariosCount ? 'badge-micro-failed' : 'badge-micro-pending');
                                    const microLabel = p.wins === p.scenariosCount ? '우위' : (p.losses === p.scenariosCount ? '열세' : '경합');
                                    const condSummary = getCandidateSummaryText(p);

                                    condHtml += `<div class="candidate-row" style="padding: 2px 0;">`;
                                    const candFlagUrl = getTeamFlagUrl(p.team_id);
                                    condHtml += `<span class="candidate-team"><img src="${candFlagUrl}" class="team-flag-img" alt="${pInfo?.ko}"> ${pInfo?.ko || '?'}</span>`;
                                    condHtml += `<span class="candidate-cond-text" style="font-size: 0.65rem;">${condSummary}</span>`;
                                    condHtml += `<span class="candidate-badge-micro ${microClass}">${microLabel}</span>`;
                                    condHtml += `</div>`;
                                });
                                condHtml += `</div>`;
                            }
                            condHtml += `</div>`;
                        }

                        detailTd.innerHTML = condHtml;
                        detailTr.appendChild(detailTd);
                        tr.parentNode.insertBefore(detailTr, tr.nextSibling);
                    }
                });
            }

            standingsTbody.appendChild(tr);
        });

        teamsAboveEl.textContent = aboveCount;
        teamsBelowEl.textContent = belowCount;

        // Automatically scroll table-wrapper to center target row (Live game row takes precedence, fallback to Korea row)
        setTimeout(() => {
            const wrapper = document.querySelector('.table-wrapper');
            if (!wrapper) return;

            // 1. Find the first row that contains a live game badge
            let targetRow = null;
            const liveBadges = document.querySelectorAll('.badge-live');
            for (const badge of liveBadges) {
                const tr = badge.closest('tr');
                if (tr) {
                    targetRow = tr;
                    break;
                }
            }

            // 2. If no live game row, fallback to Korea row
            if (!targetRow) {
                targetRow = document.querySelector('.row-korea');
            }

            // 3. Scroll wrapper to center targetRow
            if (targetRow) {
                const rowOffsetTop = targetRow.offsetTop;
                const rowHeight = targetRow.offsetHeight;
                const wrapperHeight = wrapper.offsetHeight;
                wrapper.scrollTop = rowOffsetTop - (wrapperHeight / 2) + (rowHeight / 2);
            }
        }, 100);
    }

    const STADIUM_OFFSETS = {
        '1': -6,  // Mexico City (CST)
        '2': -6,  // Guadalajara (CST)
        '3': -6,  // Monterrey (CST)
        '4': -5,  // Dallas (CDT)
        '5': -5,  // Houston (CDT)
        '6': -5,  // Kansas City (CDT)
        '7': -4,  // Atlanta (EDT)
        '8': -4,  // Miami (EDT)
        '9': -4,  // Boston (EDT)
        '10': -4, // Philadelphia (EDT)
        '11': -4, // NY/NJ (EDT)
        '12': -4, // Toronto (EDT)
        '13': -7, // Vancouver (PDT)
        '14': -7, // Seattle (PDT)
        '15': -7, // San Francisco (PDT)
        '16': -7  // Los Angeles (PDT)
    };

    function getKstDateString(localDateStr, stadiumId) {
        const parts = localDateStr.split(' ');
        const dateParts = parts[0].split('/');
        const timeParts = parts[1].split(':');
        
        const month = parseInt(dateParts[0]) - 1;
        const day = parseInt(dateParts[1]);
        const year = parseInt(dateParts[2]);
        const hour = parseInt(timeParts[0]);
        const minute = parseInt(timeParts[1]);
        
        const offset = STADIUM_OFFSETS[stadiumId] || -6;
        
        const localTimeMs = Date.UTC(year, month, day, hour, minute);
        const utcTimeMs = localTimeMs - (offset * 3600000);
        const kstDate = new Date(utcTimeMs + (9 * 3600000));
        
        const kMonth = String(kstDate.getUTCMonth() + 1).padStart(2, '0');
        const kDay = String(kstDate.getUTCDate()).padStart(2, '0');
        const kHour = String(kstDate.getUTCHours()).padStart(2, '0');
        const kMinute = String(kstDate.getUTCMinutes()).padStart(2, '0');
        
        return `${kMonth}/${kDay} ${kHour}:${kMinute} (한국)`;
    }

    function getGameStartTimeMs(game) {
        if (!game || !game.local_date) return 0;
        try {
            const parts = game.local_date.split(' ');
            const dateParts = parts[0].split('/');
            const timeParts = parts[1].split(':');
            
            const month = parseInt(dateParts[0]) - 1;
            const day = parseInt(dateParts[1]);
            const year = parseInt(dateParts[2]);
            const hour = parseInt(timeParts[0]);
            const minute = parseInt(timeParts[1]);
            
            const offset = STADIUM_OFFSETS[game.stadium_id] || -6;
            
            const localTimeMs = Date.UTC(year, month, day, hour, minute);
            const utcTimeMs = localTimeMs - (offset * 3600000);
            return utcTimeMs;
        } catch (e) {
            return 0;
        }
    }

    function shouldFetchAPI() {
        if (!allGamesData || !allGamesData.games) return false;
        
        const nowMs = Date.now();
        const FIVE_MINUTES_MS = 5 * 60 * 1000;
        const END_THRESHOLD_MS = 150 * 60 * 1000; 

        return allGamesData.games.some(game => {
            if (game.type !== 'group') return false;
            
            const startTimeMs = getGameStartTimeMs(game);
            if (startTimeMs === 0) return false;

            const isBeforeGame = nowMs >= (startTimeMs - FIVE_MINUTES_MS) && nowMs < startTimeMs;
            const isLive = game.finished !== 'TRUE' && nowMs >= startTimeMs && nowMs < (startTimeMs + 120 * 60 * 1000);
            const isJustFinished = game.finished === 'TRUE' && nowMs >= startTimeMs && nowMs <= (startTimeMs + END_THRESHOLD_MS);
            const isLiveState = game.finished === 'FALSE' && game.time_elapsed !== 'notstarted';

            return isBeforeGame || isLive || isJustFinished || isLiveState;
        });
    }

    // ===== Get Group Status Badge HTML =====
    function getGroupStatusHtml(groupName, isKorea, isFinished, simGames) {
        if (isKorea) {
            return `<span class="status-badge badge-korea">3위 확정</span>`;
        }
        if (isFinished) {
            return `<span class="status-badge badge-finished">종료</span>`;
        }

        const groupGames = simGames.filter(g => g.group === groupName && g.finished !== 'TRUE');
        if (groupGames.length === 0) {
            return `<span class="status-badge badge-finished">종료</span>`;
        }
        
        const liveGame = groupGames.find(g => g.time_elapsed !== 'notstarted' && g.finished === 'FALSE');
        if (liveGame) {
            return `<span class="status-badge badge-live">경기 중 (${liveGame.time_elapsed}')</span>`;
        }
        
        const scheduledGames = groupGames.filter(g => g.time_elapsed === 'notstarted');
        if (scheduledGames.length > 0) {
            scheduledGames.sort((a, b) => new Date(a.local_date) - new Date(b.local_date));
            const nextGame = scheduledGames[0];
            
            const kstTimeStr = getKstDateString(nextGame.local_date, nextGame.stadium_id);
            return `<span class="status-badge badge-scheduled">${kstTimeStr}</span>`;
        }

        return `<span class="status-badge badge-live">경기 대기중</span>`;
    }

    // ===== Get Candidate Summary Text for UI =====
    function getCandidateSummaryText(candidate) {
        const remainingMatches = 3 - candidate.mp;
        
        if (remainingMatches === 0) {
            if (candidate.currentPts < koreaStats.pts) return '한국 대비 하위 (확정)';
            if (candidate.currentPts > koreaStats.pts) return '한국 대비 상위 (확정)';
            if (candidate.currentGd < koreaStats.gd) return '한국 대비 하위 (확정)';
            if (candidate.currentGd > koreaStats.gd) return '한국 대비 상위 (확정)';
            if (candidate.currentGf < koreaStats.gf) return '한국 대비 하위 (확정)';
            return '한국 대비 상위 (확정)';
        }

        const maxPts = candidate.currentPts + remainingMatches * 3;
        if (maxPts < koreaStats.pts) {
            return `최종 승점 ${maxPts}점 이하 확정 (우위)`;
        }
        if (candidate.currentPts > koreaStats.pts) {
            return `승점 ${candidate.currentPts}점 이상 확정 (열세)`;
        }

        if (candidate.currentPts === 2) {
            return '무승부 이하 시 우위, 승리 시 열세';
        }
        if (candidate.currentPts === 1) {
            return '무승부 이하 시 우위, 승리 시 열세';
        }
        if (candidate.currentPts === 3) {
            return '패배 및 득실차 하락 시 우위';
        }
        if (candidate.currentPts === 0) {
            let minMargin = null;
            for (let m = 1; m <= 20; m++) {
                const finalGd = candidate.currentGd + m;
                const finalGf = candidate.currentGf + m;
                if (finalGd > koreaStats.gd || (finalGd === koreaStats.gd && finalGf > koreaStats.gf)) {
                    minMargin = m;
                    break;
                }
            }
            if (minMargin !== null) {
                if (minMargin === 1) {
                    return '무승부 이하 시 우위';
                }
                return `무승부 이하 또는 ${minMargin - 1}골 차 이하 승리 시 우위`;
            }
            return '무승부 이하 시 우위, 승리 시 득실 비교';
        }

        return `최종 승점 ${candidate.currentPts}~${maxPts}점`;
    }

    // ===== Render Scenario Modeling Panel =====
    function renderScenarioPanel(thirdPlaceTeams, simGames) {
        scenarioMatchList.innerHTML = '';
        
        const upcomingGames = simGames.filter(g => g.type === 'group' && g.finished !== 'TRUE');
        
        if (upcomingGames.length === 0) {
            scenarioMatchList.innerHTML = '<p class="scenario-subtitle" style="text-align:center; padding:10px;">잔여 경기가 없거나 모두 가상 결과가 입력되었습니다.</p>';
            return;
        }

        upcomingGames.sort((a, b) => {
            const aLive = a.time_elapsed !== 'notstarted' ? 0 : 1;
            const bLive = b.time_elapsed !== 'notstarted' ? 0 : 1;
            if (aLive !== bLive) return aLive - bLive;
            return new Date(a.local_date) - new Date(b.local_date);
        });

        const displayGames = upcomingGames.slice(0, 3);
        displayGames.forEach(game => {
            const homeInfo = TEAM_DB[game.home_team_id];
            const awayInfo = TEAM_DB[game.away_team_id];

            const div = document.createElement('div');
            div.classList.add('match-item');

            let badgeHtml = '';
            if (game.time_elapsed !== 'notstarted') {
                badgeHtml = `<span class="match-badge live-badge-sm">경기 중 (${game.time_elapsed}')</span>`;
            } else {
                const kstTimeStr = getKstDateString(game.local_date, game.stadium_id);
                badgeHtml = `<span class="match-badge badge-finished" style="font-size:0.65rem; padding: 2px 6px;">${kstTimeStr.replace(' (한국)', '')}</span>`;
            }

            const homeKo = homeInfo?.ko || game.home_team_name_en;
            const awayKo = awayInfo?.ko || game.away_team_name_en;
            const homeFlagUrl = getTeamFlagUrl(game.home_team_id);
            const awayFlagUrl = getTeamFlagUrl(game.away_team_id);

            div.innerHTML = `
                <div class="match-teams">
                    <div class="team-side">
                        <img src="${homeFlagUrl}" class="team-flag-img" alt="${homeKo}">
                        <span class="team-name">${homeKo}</span>
                    </div>
                    <span class="vs-text">vs</span>
                    <div class="team-side">
                        <img src="${awayFlagUrl}" class="team-flag-img" alt="${awayKo}">
                        <span class="team-name">${awayKo}</span>
                    </div>
                </div>
                ${badgeHtml}
            `;
            scenarioMatchList.appendChild(div);
        });
    }



    // ===== Dashboard Update =====
    function updateDashboard(probability) {
        gaugeBar.style.width = probability + '%';
        gaugePointer.style.left = probability + '%';
        gaugeValueTip.textContent = probability.toFixed(1) + '%';
        animateProbValue(probability);
        updateCoachExpression(probability);
        updateProbColor(probability);
    }

    function updateCoachExpression(probability) {
        let stage;
        if (probability >= 100) {
            stage = COACH_STAGES.find(s => s.key === 'qualified');
        } else if (probability > 60) {
            stage = COACH_STAGES.find(s => s.key === 'positive');
        } else if (probability >= 40) {
            stage = COACH_STAGES.find(s => s.key === 'fiftyfifty');
        } else if (probability > 0) {
            stage = COACH_STAGES.find(s => s.key === 'crisis');
        } else {
            stage = COACH_STAGES.find(s => s.key === 'eliminated');
        }

        if (currentStageKey !== stage.key) {
            currentStageKey = stage.key;
            coachImg.style.opacity = '0';
            coachImg.style.transform = 'scale(0.9)';
            setTimeout(() => {
                coachImg.src = stage.img;
                coachImg.onload = () => {
                    coachImg.style.opacity = '1';
                    coachImg.style.transform = 'scale(1)';
                };
            }, 200);
            statusText.textContent = stage.label;
            const section = document.querySelector('.probability-section');
            COACH_STAGES.forEach(s => section.classList.remove('coach-state-' + s.key));
            section.classList.add('coach-state-' + stage.key);
            addLog(`띵보 상태 변경 → ${stage.label} (${probability.toFixed(1)}%)`);
        }
    }

    function updateProbColor(probability) {
        let color;
        if (probability >= 100) color = 'var(--color-qualified)';
        else if (probability > 60) color = 'var(--color-positive)';
        else if (probability >= 40) color = 'var(--color-fiftyfifty)';
        else if (probability > 0) color = 'var(--color-crisis)';
        else color = 'var(--color-eliminated)';
        probValue.style.color = color;
        document.querySelector('.prob-percent').style.color = color;
    }

    function animateProbValue(target) {
        const current = parseFloat(probValue.textContent) || 0;
        const diff = target - current;
        const duration = 600;
        const startTime = performance.now();
        if (animFrameId) cancelAnimationFrame(animFrameId);
        function step(now) {
            const progress = Math.min((now - startTime) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            probValue.textContent = (current + diff * eased).toFixed(1);
            if (progress < 1) animFrameId = requestAnimationFrame(step);
        }
        animFrameId = requestAnimationFrame(step);
    }

    // ===== Dual Timezone Clock =====
    function startClock() {
        function update() {
            const now = new Date();
            const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
            
            const kst = new Date(utc + (3600000 * 9));
            const mex = new Date(utc + (3600000 * -6));
            
            const formatTime = (d) => {
                return `${String(d.getHours()).padStart(2,'0')}:${String(d.getMinutes()).padStart(2,'0')}:${String(d.getSeconds()).padStart(2,'0')}`;
            };
            
            $('kst-time').textContent = formatTime(kst);
            $('mex-time').textContent = formatTime(mex);
        }
        update();
        setInterval(update, 1000);
    }

    // ===== Countdown =====
    function startCountdown() {
        setInterval(() => {
            if (settings.autoRefetch) {
                if (shouldFetchAPI()) {
                    settings.countdown = (parseInt(settings.countdown) || 60) - 1;
                    if (settings.countdown <= 0) {
                        settings.countdown = 60;
                        addLog('자동 새로고침 트리거됨...');
                        fetchAllData();
                    }
                } else {
                    settings.countdown = '대기 (경기 없음)';
                }
                saveSettings();
            }
        }, 1000);
    }

    // ===== Console Log =====
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
    }

    // ===== Start =====
    document.addEventListener('DOMContentLoaded', init);
})();
