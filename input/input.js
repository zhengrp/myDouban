(function ($) {
    console.log('input')
    var obj = {
        init: function (options) {
            this.opt = options || {};
            this.createDom();
            this.bindEvent();
        },
        createDom: function () {
            var htmlStr = ' <div class="inp">\
            <input type="text" class="text" placeholder="">\
            <div class="btn"><div>搜索</div>';
            this.opt.father.html(htmlStr);
            $('.inp input').attr('placeholder', this.opt.text);
        },
        bindEvent: function () {   
            var self = this;
            $('.inp input').on('input', function (e) {
                e.preventDefault();
                var value = $(this).val();
                self.getData(value);
            });
        },
        getData: function (val) {
            var self = this;
            var opt = self.opt; 
            console.log(val)
            $.ajax({
                type: opt.type,
                url: opt.url,
                // data: 'q=' + value + '&count=7',
                data: opt.data + val + opt.count,
                dataType: opt.dataType,
                success: function(data){
                    opt.sucFn(data);
                },
            });
        },
        
    }
    $.fn.extend({
        search: function (options) {
            options.father = this || $('body');
            obj.init(options);
        }
    })
})(jQuery)