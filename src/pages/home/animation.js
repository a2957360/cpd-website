var rotatePhos = (function() { 
    var timeId = 0;
    var util = { 
        $: function(sId) { return document.getElementById(sId); }, 
        $$: function(tagName, parent) { parent = parent || document; return parent.getElementsByTagName(tagName); }, 
        addEventHandler: function(elem, type, handler) { 
            if (elem.addEventListener) { 
                elem.addEventListener(type, handler, false); 
            } 
            else { 
                elem.attachEvent("on" + type, handler); 
            } 
        }, 
        removeEventHandler: function(elem, type, handler) { 
            if (elem.removeEventListener) { 
                elem.removeEventListener(type, handler, false); 
            } 
            else { 
                elem.detachEvent("on" + type, handler); 
            } 
        }, 
        getComputedStyle: function(elem) { 
            if (elem.currentStyle) 
                return elem.currentStyle; 
            else { 
                return document.defaultView.getComputedStyle(elem, null); 
            } 
        }, 
        emptyFunction: function() { }, 
        getElementsByClassName: function(className, parentElement) { 
            var elms = (parentElement || document.body).getElementsByTagName("*"); 
            var result = []; 
            const j=0;
            for (const i = 0; j = elms[i]; i++) { 
            if ((" " + j.className + " ").indexOf(" " + className + " ") != -1) { 
            result.push(j); 
            } 
            } 
            return result; 
        }, 
        extend: function(destination, source) { 
            for (var name in source) { 
                destination[name] = source[name]; 
            } 
            return destination; 
        } 
    }; 
    var rp = function(id, options) { 
        this.init(id, options); //初始化 
    } 
    rp.prototype = (function() { 
        var rotate; 
        var imgWidth; 
        var imgHeight; 
        var scaleMargin; 
        var con; 
        var handler; 
        var Tween = {//缓动类 默认提供三种缓动模式：linear easein easeout 
            linear: function(t, b, c, d, dir) { return c * t / d * dir + b; }, 
            easeIn: function(t, b, c, d, dir) { 
                return c * (t /= d) * t * dir + b; 
            }, 
            easeOut: function(t, b, c, d, dir) { 
                return -c * (t /= d) * (t - 2) * dir + b; 
            } 
        }; 
        /* 改变椭圆旋转轨迹的横半轴长，竖半轴长*/ 
        var changeRotateWH = function(width, height) { 
            var halfScale = (this.maxScale - this.minScale) / 2; //旋转到中间位置时的图片的缩放大小 
            rotate = {}; 
            rotate.originX = width / 2; //旋转原点X轴坐标 
            rotate.originY = height / 2; //旋转原点Y轴坐标 
            rotate.halfRotateWidth = (width - this.imgWidth) / 2; //旋转横半轴长 
            rotate.halfRotateHeight = (height - this.imgHeight) / 2; //旋转竖半轴长 
        } 
        /* 设置图片旋转角和初始位置，大小 */ 
        var initImgRC = function(imgs) { 
            var len = imgs.length; 
            con = (2 * Math.PI) / len; 
            for (var i = 0; i < len; i++) { 
                imgs[i].RC = i * con; 
                imgs[i].style.width = imgWidth + 'px'; 
                imgs[i].style.height = imgHeight + 'px'; 
                setImgPositionAndSize(imgs[i], 0); 
            } 
        } 
        /* 设置图片大小 */ 
        var setImgSize = function(img) { 
            var left = rotate.originX + rotate.halfRotateWidth * Math.cos(img.RC) - imgWidth / 2; 
            var top = rotate.originY - rotate.halfRotateHeight * Math.sin(img.RC) - imgHeight / 2; 
            var scale = 0.5 + scaleMargin * (rotate.halfRotateHeight - rotate.halfRotateHeight * Math.sin(img.RC)) / (2 * rotate.halfRotateHeight); //图片在该时刻的缩放比 
            img.style.cssText = 'position:absolute;left:' + left + 'px;' 
            + 'top:' + top + 'px;' 
            + 'width:' + imgWidth * scale + 'px;' 
            + 'height:' + imgHeight * scale + 'px;' 
            + 'cursor:pointer;' 
            + 'z-index:' + Math.round(scale * 100); 
        } 
        /* 设置图片位置和大小的匀速变化 */ 
        var setImgPositionAndSize = function(img, path, direction) { 
            direction = direction || 'CW'; 
            var dir = direction == 'CW' ? -1 : 1; 
            img.RC += (path * dir); 
            modifyImgAngle(img); 
            setImgSize(img); 
        } 
        /* 修改图片旋转角度（保证在0-2pai之间） */ 
        var modifyImgAngle = function(img) { 
            (img.RC > (2 * Math.PI)) && (img.RC -= 2 * Math.PI); 
            (img.RC < 0) && (img.RC += 2 * Math.PI); 
        } 
        /* 设置图片的新位置 */ 
        var setPos = function(img, path) { 
            img.RC = path; 
            modifyImgAngle(img); 
            var left = rotate.originX + rotate.halfRotateWidth * Math.cos(img.RC) - imgWidth / 2; 
            var top = rotate.originY - rotate.halfRotateHeight * Math.sin(img.RC) - imgHeight / 2; 
            var scale = 0.5 + scaleMargin * (rotate.halfRotateHeight - rotate.halfRotateHeight * Math.sin(img.RC)) / (2 * rotate.halfRotateHeight); //图片在该时刻的缩放比 
            img.style.cssText = 'position:absolute;left:' + left + 'px;' 
            + 'top:' + top + 'px;' 
            + 'width:' + imgWidth * scale + 'px;' 
            + 'height:' + imgHeight * scale + 'px;' 
            + 'z-index:' + Math.round(scale * 100); 
        } 
        /* 旋转指定角度 */ 
        var rotateAngle = function(imgs, angle, dir, tween, onSelected) { 
            var duration = 1000; 
            var startTime = (new Date()).getTime(); 
            dir === 'CW' ? dir = -1 : dir = 1; 
            for (var i = 0, len = imgs.length; i < len; i++) { 
                imgs[i].startAngle = imgs[i].RC; 
            } 
            timeId = window.setInterval(function() { 
                var now = (new Date()).getTime(); 
                if ((now - startTime) >= duration) { 
                    window.clearInterval(timeId); 
                    timeId = undefined; 
                    onSelected = onSelected || util.emptyFunction; 
                    onSelected(); //触发回调函数; 
                } 
                for (var i = 0, len = imgs.length; i < len; i++) { 
                    var path = tween(now - startTime, imgs[i].startAngle, angle, duration, dir); //通过缓动公式计算新角度（RC） 
                    setPos(imgs[i], path, dir); 
                } 
            }, 20); 
        } 
        /* 图片选择事件处理程序 */ 
        var imgSelectedHandler = function(imgs, path, tween, onSelected) { 
            return function(eve) { 
                eve = eve || window.event; 
                var dir; 
                var angle; 
                var target = eve.target || eve.srcElement; 
                var RC = target.RC; 
                if (RC >= Math.PI / 2 && RC <= Math.PI * 3 / 2) { 
                    dir = 'ACW'; 
                    angle = 3 * Math.PI / 2 - RC; 
                } 
                else { 
                    dir = 'CW'; 
                    Math.sin(RC) >= 0 ? angle = Math.PI / 2 + RC : angle = RC - 3 * Math.PI / 2; 
                } 
                (typeof timeId != 'undefined') && window.clearInterval(timeId); 
                rotateAngle(imgs, angle, dir, tween, onSelected); 
            } 
        } 
        /* 为图片绑定点击事件处理程序 */ 
        var bindHandlerForImgs = function(imgs, path, onSelected) { 
            for (var i = 0, len = imgs.length; i < len; i++) { 
                imgs[i].handler = imgSelectedHandler(imgs, path, onSelected); 
                util.addEventHandler(imgs[i], 'click', imgs[i].handler); 
            } 
        } 
        /* 删除图片上的点击事件处理程序 */ 
        var removeImgsHandler = function(imgs) { 
            for (var i = 0, len = imgs.length; i < len; i++) { 
                if (imgs[i].handler) { 
                    util.removeEventHandler(imgs[i], 'click', imgs[i].handler); 
                } 
            } 
        } 
        return { 
            /* 初始化 */ 
            init: function(id, options) { 
                var defaultOptions = { 
                    width: 700, //容器宽 
                    height: 300, //容器高 
                    imgWidth: 130, //图片宽 
                    imgHeight: 80, //图片高 
                    maxScale: 1.5, //最大缩放倍数 
                    minScale: 0.5, //最小缩放倍数 
                    rotateSpeed: 10 //运转速度 
                } 
                options = util.extend(defaultOptions, options); //参数设置 
                this.container = util.$(id); 
                this.width = options.width; 
                this.height = options.height; 
                imgWidth = this.imgWidth = options.imgWidth; 
                imgHeight = this.imgHeight = options.imgHeight; 
                this.maxScale = options.maxScale; 
                this.minScale = options.minScale; 
                scaleMargin = this.maxScale - this.minScale; 
                this.rotateSpeed = options.rotateSpeed; 
                this.imgs = util.$$('img', this.container); 
                this.setContainerSize(this.width, this.height); 
                initImgRC(this.imgs); 
            }, 
            /* 设置容器尺寸 */ 
            setContainerSize: function(width, height) { 
                width = width || this.width; 
                height = height || this.height; 
                this.container.style.position = 'relative'; 
                this.container.style.width = width + 'px'; 
                this.container.style.height = height + 'px'; 
                changeRotateWH.call(this, width, height); //改变容器尺寸后改变旋转轨迹 
            }, 
            /* 选择上一幅图片 */ 
            prePho: function(onSelected) { 
                if (this.pattern == 'hand') { 
                    onSelected = onSelected || util.emptyFunction; 
                    var tween = tween || Tween['easeOut']; 
                    if (typeof timeId != 'undefined') { 
                        return; 
                    } else { 
                        rotateAngle(this.imgs, con, 'ACW', tween, onSelected); 
                    } 
                } 
            }, 
            /* 选择下一幅图片 */ 
            nextPho: function(onSelected) { 
                if (this.pattern == 'hand') { 
                    onSelected = onSelected || util.emptyFunction; 
                    var tween = tween || Tween['easeOut']; 
                    if (typeof timeId != 'undefined') { 
                        return; 
                    } else { 
                        rotateAngle(this.imgs, con, 'CW', tween, onSelected); 
                    } 
                } 
            }, 
            /* 添加缓动模式 */ 
            addTweenFunction: function(name, func) { 
                if (typeof func == 'Function' || typeof func == 'Object') { 
                    Tween[name] = func; 
                } 
            }, 
            /* 设置旋转模式（自动/手动）*/ 
            setPattern: function(patternName, option) { 
                option = option || {}; 
                this.pattern = patternName; 
                var rotateSpeed = option.rotateSpeed || 10; 
                this.path = Math.PI / 1000 * rotateSpeed; 
                (typeof timeId != 'undefined') && window.clearInterval(timeId); 
                if (patternName === 'auto') {//自动模式 可传入旋转方向：option.rotateDir 旋转速度：option.rotateSpeed 
                    var self = this; 
                    var direction = option.rotateDir || 'CW'; //顺时针：CW 逆时针：ACW 
                    removeImgsHandler(this.imgs); 
                    timeId = window.setInterval(function() { 
                        for (var i = 0, len = self.imgs.length; i < len; i++) { 
                            setImgPositionAndSize(self.imgs[i], self.path, direction); 
                        } 
                    }, 20); 
                } 
                else if (patternName === 'hand') {//手动模式，可传回调函数：option.onSelected 缓动模式：option.tween 
                    var onSelected = option.onSelected || util.emptyFunction; 
                    var tween = Tween[tween] || Tween['easeOut']; //缓动模式默认为easeout 
                    removeImgsHandler(this.imgs); 
                    (typeof timeId != 'undefined') && window.clearInterval(timeId); 
                    timeId = undefined; 
                    bindHandlerForImgs(this.imgs, this.path, tween, onSelected); 
                } 
            } 
        } 
    })(); 
    return rp; 
})(); 
var rp=new rotatePhos('container'); 
//rp.setPattern('auto',{rotateSpeed:10}); 
rp.setPattern('hand'); 
document.getElementById('pre').onclick=function(){rp.prePho();}; 
document.getElementById('next').onclick=function(){rp.nextPho();}; 