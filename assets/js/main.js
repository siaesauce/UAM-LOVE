/* 恋爱计时 */

let startingDate = '2022-02-07'; //设置为你的恋爱开始日

startingDate = new Date(startingDate.replace(/-/g, "/"));

startingDate1 = new Date();

let days = startingDate1.getTime() - startingDate.getTime();

let number_of_days = parseInt(days / (1000 * 60 * 60 * 24));

document.getElementById('days').innerHTML = number_of_days + 1;

/* Touch判断左滑右滑 */

window.onload = function () {

    let stus = true;
    let main = document.querySelector('.main');
    let startX, startY, moveX, moveY, X, Y,counter;

    //touchstart
    main.addEventListener('touchstart', function (event) {
        startX = event.touches[0].clientX;
        startY = event.touches[0].clientY;
    })

    //touchmove
    main.addEventListener('touchmove', function (event) {
        moveX = event.touches[0].clientX;
        moveY = event.touches[0].clientY;
    })


    //touchend
    main.addEventListener('touchend', function (event) {
        var boyfriend = document.getElementById('boyfriend');
        var girlfriend = document.getElementById('girlfriend');
        X = moveX - startX;
        Y = moveY - startY;
        counter = Math.abs(moveX - startX);
        if ((Math.abs(X) > Math.abs(Y) && X > 0) || (Math.abs(X) > Math.abs(Y) && X < 0) && moveX != 0) {
            if(counter > 50){
                if (stus) {
                    boyfriend.style.display = 'none';
                    girlfriend.style.display = 'block';
                    stus = !stus;
                } else {
                    boyfriend.style.display = 'block';
                    girlfriend.style.display = 'none';
                    stus = !stus;
                }
            }

        }
        X = 0;
        Y = 0;
        startX = 0;
        startY = 0;
        moveX = 0;
        moveY = 0;
        counter = 0;
    })
}