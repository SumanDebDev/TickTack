var box = document.getElementsByTagName('li')
var clickCount = 0
var alertOuter = document.getElementById('alertOuter')
var alertContent = document.getElementById('alertContent')

var check = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

for (var i = 0; i < box.length; i++) {
    (function(index) {
        box[i].onclick = function() {
            var checkingX = 0;
            var checkingO = 0;
            var atkGap = 0;
            var dfsGap = 0;
            var both = 0;
            var bothIndexX;
            var bothIndexO;
            var cond1 = 0;
            var cond2 = 0;

            if (this.innerHTML == '') {
                this.innerHTML = 'O'
                this.style.pointerEvents = 'none'
            }
            clickCount++

            if (clickCount == 1) {
                if (index == 4) {
                    box[8].innerHTML = 'X'

                } else {
                    box[4].innerHTML = 'X'
                }
            }



            if (clickCount >= 2) {
                for (var loop = 0; loop < 8; loop++) {
                    var findGapO = 0
                    var findGapX = 0

                    for (var j = 0; j < 3; j++) {
                        if (box[check[loop][j]].innerHTML == 'X') {
                            findGapX++

                            // console.log(loop, j, findGapX)
                            if (findGapX == 2 && findGapO == 0) {
                                atkGap = findGapX
                                checkingX = loop
                                    // console.log(findGapX, findGapO)
                            }
                        }

                        if (box[check[loop][j]].innerHTML == 'O') {
                            findGapO++
                            if (findGapO == 2 && findGapX == 0) {
                                dfsGap = findGapO
                                checkingO = loop
                            }
                        }
                    }
                    // if (dfsGap == atkGap && checkingX != checkingO) {
                    //     atkGap--
                    // }
                }

                if (dfsGap == 2 && atkGap == 2) {
                    if (atkGap == 2) {
                        for (var l = 0; l < 3; l++) {
                            if (box[check[checkingX][l]].innerHTML == '') {
                                box[check[checkingX][l]].innerHTML = 'X'
                                cond1 = 1
                            }
                        }
                    }
                } else {
                    if (dfsGap == 2) {
                        for (var l = 0; l < 3; l++) {
                            if (box[check[checkingO][l]].innerHTML == '') {
                                box[check[checkingO][l]].innerHTML = 'X'
                                cond2 = 1
                            }
                        }
                    }
                }
                if (cond1 == 0) {
                    if (dfsGap == 2) {
                        for (var l = 0; l < 3; l++) {
                            if (box[check[checkingO][l]].innerHTML == '') {
                                box[check[checkingO][l]].innerHTML = 'X'
                                cond2 = 1
                            }
                        }
                    }
                }
                if (cond1 == 0 && cond2 == 0) {
                    for (var m = 0; m < 9; m++) {
                        if (box[m].innerHTML == '') {
                            box[m].innerHTML = 'X'
                            m = 9
                        }
                    }
                }
            }

            for (var l = 0; l < 9; l++) {
                if (box[l].innerHTML == 'X') {
                    box[l].style.color = 'rgb(87, 121, 255)';

                }
                if (box[l].innerHTML != '') {
                    box[l].style.pointerEvents = 'none'
                }
            }

            if (clickCount >= 3) {
                var wX = 0
                var wO = 0
                for (var i = 0; i < 8; i++) {
                    for (var j = 0; j < 3; j++) {
                        if (box[check[i][j]].innerHTML == 'X') {
                            wX++
                        }
                        if (box[check[i][j]].innerHTML == 'O') {
                            wO++
                        }
                        if (wX == 3) {
                            var k = 0
                            setInterval(function() {
                                if (k <= 2) {
                                    box[check[i][k]].style.background = '#25b275'
                                    box[check[i][k]].style.color = '#fff'
                                    k++
                                }
                            }, 200)
                            setTimeout(function() {
                                alertContent.innerHTML = "<strong class='X'>Computer</strong><strong class='O'> Win</strong>"
                                alertOuter.style.display = 'block'
                            }, 2000)
                            document.getElementById('container').style.pointerEvents = 'none'
                            return false
                        }
                        if (wO == 3) {
                            var l = 0
                            setInterval(function() {
                                if (l <= 2) {
                                    box[check[i][l]].style.background = '#25b275'
                                    box[check[i][l]].style.color = '#fff'
                                    l++
                                }
                            }, 200)
                            setTimeout(function() {
                                alertContent.innerHTML = "<strong class='O'>You</strong> <strong class='X'>Win</strong>"
                                alertOuter.style.display = 'block'
                            }, 2000)
                            document.getElementById('container').style.pointerEvents = 'none'
                            return false
                        }
                    }
                    wX = 0
                    wO = 0
                }
            }
            if (clickCount >= 5) {
                alertContent.innerHTML = 'Match Draw'
                alertOuter.style.display = 'block'
            }



        }
    })(i)
}