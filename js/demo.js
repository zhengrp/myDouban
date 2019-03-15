
var obj = {
    init: function () {
        this.value = $('#inputWrap').find('input').val();
        this.slider();
        this.tab();
        this.getData();
    },
    slider: function () {
        $('#swiper').sliderImg({
            image: ['./img/banner1.jpg', './img/banner2.jpg', './img/banner3.jpg', './img/banner4.jpg', './img/banner5.jpg', './img/banner6.jpg', './img/banner1.jpg']
        })
    },
    tab: function () {
        var arr1 = [
            { name: 'Get money', des: '记忆煽情', img: './img/1.png' },
            { name: '秀逗', des: '和宫儿啊', img: './img/1.png' },
            { name: 'Get money', des: '记忆煽情', img: './img/1.png' },
            { name: '秀逗', des: '和宫儿啊', img: './img/1.png' },
        ];
        var arr2 = [
            { name: '杨众国', des: '原声 Soundtrack', img: './img/2.png' },
            { name: '杨众国', des: '原声 Soundtrack', img: './img/2.png' },
            { name: 'Get money', des: '记忆煽情', img: './img/2.png' },
            { name: '秀逗', des: '和宫儿啊', img: './img/2.png' },
        ];
        var tabArr = [];

        var div1 = this.addDom($('<div class="conBox"></div>'), '', arr1);
        var div2 = this.addDom($('<div class="conBox"></div>'), '', arr2);
        tabArr.push(div1);
        tabArr.push(div2);

        $('#tabWrapper').tab({
            tabList: ['本周流行音乐人', '上升最快音乐人'],
            conStr: tabArr,
            spanCon: '热歌榜',
        })
    },
    addDom: function (conBox, strHtml, arr) {
        for (var i = 0; i < arr.length; i++) {
            strHtml += '<div class="box"><div class="imgBox">' +
                '<img src="' + arr[i].img + '" alt=""></div>' +
                '<div class="con"><a href="#" class="name">' + arr[i].name + '</a>' +
                '<span href="#" >' + arr[i].des + '</span></div></div>';
        }
        conBox.append(strHtml);
        return conBox;
    },
    getData: function () {
        var self = this;
        $('#inputWrap').search({
            type: 'GET',
            url: 'https://api.douban.com/v2/music/search',
            data: 'q=',
            count: '&count=7',
            dataType: 'jsonp',
            sucFn: self.addItem,
            text: '唱片名、表演者、条码'
        })
    },
    addItem: function (data) {
        console.log(data)
        var self = this;
        var dataList = data.musics;
        var $searchList = $('.search-list');
        var str = '';
        if (dataList.length > 0) {
            dataList.forEach(function (ele, index) {  
                // var src = self.getImage(ele.image);
                var url = ele.image;
                if (url !== undefined) {
                    // https://images.weserv.nl/?url=
                    // https://                      img3.doubanio.com/view/subject/s/public/s3924386.jpg
                    // https://images.weserv.nl/?url=img3.doubanio.com/view/subject/s/public/s3924386.jpg
                    // return url.replace(/http\w{0,1}:\/\/p/g, 'https://images.weserv.nl/?url=p');
                    var reg = /https:\/\//g;
                    src = url.replace(reg,'https://images.weserv.nl/?url=')
                }
                str += '<li>\
                            <a href="https://music.douban.com/subject/'+ ele.id + '">\
                                <img src="'+ src + '" alt="">\
                                <div>\
                                    <em>'+ ele.title + '</em>\
                                    <p>'+ ele.author[0].name + '</p>\
                                </div>\
                            </a>\
                        </li>'
            })
            $searchList.html($(str));
        }
    },

    // getImage: function (url){
    //     // 把现在的图片连接传进来，返回一个不受限制的路径
    //     if (url !== undefined) {
    //         // https://images.weserv.nl/?url=
    //         // https://                      img3.doubanio.com/view/subject/s/public/s3924386.jpg
    //         // https://images.weserv.nl/?url=img3.doubanio.com/view/subject/s/public/s3924386.jpg
    //         // return url.replace(/http\w{0,1}:\/\/p/g, 'https://images.weserv.nl/?url=p');
    //         var reg = /https:\/\//g;
    //         return url.replace(reg,'https://images.weserv.nl/?url=')
    //     }
    // }
}

obj.init();



// $('#inputWrap').search({
//     type: 'GET',
//     url: 'https://api.douban.com/v2/music/search',
//     data: 'q=',
//     count: '&count=7',
//     dataType: 'jsonp',
//     sucFn: addItem,
//     text: '唱片名、表演者、条码'
// })
// function addItem(data) {
//     console.log(data);
// }


