        document.addEventListener('DOMContentLoaded', () => {
            const canvas = document.querySelector('.game-canvas');
            const ctx = canvas.getContext('2d');
            const gameStartBtn = document.querySelector('.game-start');
            const gameResetBtn = document.querySelector('.game-reset');
            const gameScore = document.querySelector('.game-score');

            // Зміні для гри
            let snake = []; // Змійка буде представлена масивом координат
            let food = {}; // Об'єкт для координат їжі
            let direction = 'right'; // Початковий напрямок руху змійки
            let isGameRunning = false;
            let score = 0;

            // Зображення для змійки та їжі
            const snakeHeadImg = new Image();
            snakeHeadImg.src = 'img/snake.png';
            const foodImg = new Image();
            foodImg.src = 'img/cherry.png';

            // Функція для старту гри
            function startGame() {
                isGameRunning = true;
                snake = [{ x: 10, y: 10 }]; // Початкова позиція змійки
                score = 0;
                direction = 'right';
                gameScore.textContent = 'Очки: 0';
                generateFood();
                requestAnimationFrame(updateGame);
            }

            // Функція для перезапуску гри
            function resetGame() {
                isGameRunning = false;
                snake = [];
                food = {};
                direction = 'right';
                score = 0;
                gameScore.textContent = 'Очки: 0';
                ctx.clearRect(0, 0, canvas.width, canvas.height);
            }

            // Функція для генерації їжі на випадковому місці
            function generateFood() {
                food = {
                    x: Math.floor(Math.random() * (canvas.width / 10)) * 10,
                    y: Math.floor(Math.random() * (canvas.height / 10)) * 10
                };
            }

            // Функція для малювання змійки
            function drawSnake() {
                for (let i = 0; i < snake.length; i++) {
                    const segment = snake[i];
                    if (i === 0) {
                        // Голова змійки
                        ctx.drawImage(snakeHeadImg, segment.x, segment.y, 10, 10);
                    } else {
                        // Тіло змійки
                        ctx.fillStyle = 'green';
                        ctx.fillRect(segment.x, segment.y, 10, 10);
                    }
                }
            }

            // Функція для малювання їжі
            function drawFood() {
                ctx.drawImage(foodImg, food.x, food.y, 10, 10);
            }

            // Функція для оновлення гри
            function updateGame() {
                if (!isGameRunning) return;

                ctx.clearRect(0, 0, canvas.width, canvas.height);

                // Рух змійки
                const headX = snake[0].x;
                const headY = snake[0].y;

                switch (direction) {
                    case 'right':
                        snake.unshift({ x: headX + 10, y: headY });
                        break;
                    case 'left':
                        snake.unshift({ x: headX - 10, y: headY });
                        break;
                    case 'up':
                        snake.unshift({ x: headX, y: headY - 10 });
                        break;
                    case 'down':
                        snake.unshift({ x: headX, y: headY + 10 });
                        break;
                }

                // Перевірка зіткнення з їжею
                if (headX === food.x && headY === food.y) {
                    score += 10;
                    gameScore.textContent = 'Очки: ' + score;
                    generateFood();
                } else {
                    snake.pop(); // Видалення останнього сегменту, якщо не їсть їжу
                }

                // Перевірка зіткнення з межами
                if (headX < 0 || headX >= canvas.width || headY < 0 || headY >= canvas.height) {
                    isGameRunning = false;
                    alert('Ви програли! Ваш рахунок: ' + score);
                    return;
                }

                drawSnake();
                drawFood();

                // Рух змійки буде повільним
                setTimeout(() => {
                    requestAnimationFrame(updateGame);
                }, 100);
            }

            // Обробник клавіш
            document.addEventListener('keydown', (event) => {
                if (event.keyCode === 37 && direction !== 'right') { // Вліво
                    direction = 'left';
                } else if (event.keyCode === 38 && direction !== 'down') { // Вверх
                    direction = 'up';
                } else if (event.keyCode === 39 && direction !== 'left') { // Вправо
                    direction = 'right';
                } else if (event.keyCode === 40 && direction !== 'up') { // Вниз
                    direction = 'down';
                }
            });

            // Обробник кнопки "Старт"
            gameStartBtn.addEventListener('click', startGame);

            // Обробник кнопки "Перезапуск"
            gameResetBtn.addEventListener('click', resetGame);
        });