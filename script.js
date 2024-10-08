document.addEventListener('DOMContentLoaded', function() {
    // 총 애미 초기값 설정
    let totalAmmi = 1000000;

    // 총 애미 업데이트 함수
    function updateTotalAmmiDisplay() {
        document.getElementById('total-ammi').textContent = totalAmmi;
    }

    // 룰렛 게임 로직
    document.getElementById('play-roulette').addEventListener('click', function() {
        const betAmount = parseInt(document.getElementById('bet-amount-roulette').value);
        const resultElement = document.getElementById('roulette-result');
        
        if (isNaN(betAmount) || betAmount <= 0) {
            resultElement.textContent = '유효한 애미 수를 입력하세요.';
            return;
        }
        
        if (betAmount > totalAmmi) {
            resultElement.textContent = '애미가 부족합니다!';
            return;
        }

        const random = Math.random() * 100;
        let resultText = '';
        let finalAmount = 0;

        if (random < 7) {
            resultText = '우흥~';
            finalAmount = 0;
        } else if (random < 37) {
            resultText = '반띵! 절반 잃음!';
            finalAmount = betAmount * 0.5;
        } else if (random < 57) {
            resultText = '본전! 그대로 돌려받음!';
            finalAmount = betAmount;
        } else if (random < 77) {
            resultText = '이득! 150% 돌려받음!';
            finalAmount = betAmount * 1.5;
        } else if (random < 87) {
            resultText = ' 시계를 받았다! 120% 돌려받음!';
            finalAmount = betAmount * 1.2;
        } else if (random < 97) {
            resultText = '코알라가 소매치기를 했다?!?! 80% 돌려받음!';
            finalAmount = betAmount * 0.8;
        } else {
            resultText = '야~ 기분좋다!';
            finalAmount = betAmount * 2.0;
        }

        // 애미 업데이트
        totalAmmi = totalAmmi - betAmount + Math.floor(finalAmount);
        updateTotalAmmiDisplay();

        resultElement.textContent = `${resultText} 최종 애미: ${Math.floor(finalAmount)} 애미`;
    });

    // 주사위 게임 로직
    document.getElementById('play-dice').addEventListener('click', function() {
        const betAmount = parseInt(document.getElementById('bet-amount-dice').value);
        const pick1 = parseInt(document.getElementById('dice-pick1').value);
        const pick2 = parseInt(document.getElementById('dice-pick2').value);
        const resultElement = document.getElementById('dice-result');

        if (isNaN(betAmount) || betAmount <= 0 || isNaN(pick1) || isNaN(pick2) || pick1 === pick2 || pick1 < 1 || pick1 > 6 || pick2 < 1 || pick2 > 6) {
            resultElement.textContent = '유효한 애미 수와 숫자를 입력하세요.';
            return;
        }

        if (betAmount > totalAmmi) {
            resultElement.textContent = '애미가 부족합니다!';
            return;
        }

        const random1 = Math.floor(Math.random() * 6) + 1;
        const random2 = Math.floor(Math.random() * 6) + 1;

        let resultText = `주사위 결과: ${random1}, ${random2}`;
        let finalAmount = 0;

        if ((pick1 === random1 || pick1 === random2) && (pick2 === random1 || pick2 === random2)) {
            resultText += ' 두 숫자 모두 맞췄습니다! 200% 돌려받음!';
            finalAmount = betAmount * 2.0;
        } else if (pick1 === random1 || pick1 === random2 || pick2 === random1 || pick2 === random2) {
            resultText += ' 한 숫자 맞췄습니다! 150% 돌려받음!';
            finalAmount = betAmount * 1.5;
        } else {
            resultText += ' 숫자를 모두 틀렸습니다. 30% 돌려받음!';
            finalAmount = betAmount * 0.3;
        }

        // 애미 업데이트
        totalAmmi = totalAmmi - betAmount + Math.floor(finalAmount);
        updateTotalAmmiDisplay();

        resultElement.textContent = `${resultText} 최종 애미: ${Math.floor(finalAmount)} 애미`;
    });

    // 페이지 로드 시 총 애미 표시
    updateTotalAmmiDisplay();
});
