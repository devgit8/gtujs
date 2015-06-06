/*!
 * jQuery userTag plugin
 * Author: Gaurav Malviya
 * Further changes: @devgit8
 */


;
(function($) {

    $.fn.gtujs = function(skipIds, options) {

        var userlistarray = [];

        userlistarray.push({
            id: 'U01',
            name: 'Gaurav',
            imageurl: 'images/award-giftbox-icon.png'
        });
        userlistarray.push({
            id: 'U02',
            name: 'Shailesh',
            imageurl: 'images/award-giftbox-icon.png'
        });
        userlistarray.push({
            id: 'U03',
            name: 'Dilip',
            imageurl: 'images/award-giftbox-icon.png'
        });



        var KEY = {
            UP: 38,
            DOWN: 40,
            DEL: 8,
            TAB: 9,
            RETURN: 13,
            ESC: 27,
            COMMA: 188,
            PAGEUP: 33,
            PAGEDOWN: 34
        };


        // This is the easiest way to have default options.
        var settings = $.extend({}, $.fn.gtujs.defaults, options);


        return this.each(function() {
            // Do something to each element here.

            var elem = $(this);
            var elemname = elem.attr("id");

            elem.html('');
            elem.append("<div class='selected-user'><input size='5' type='text' name='name' maxlength='100' value=''/></div><div class='gtu-main-div-progress'><img alt='' src='loading.gif'/></div>");
            
            elem.after("<div id='" + elemname + "_userlistdiv' class='gtu-main-dropshadow gtu-main-listdiv' style='z-index: 1000;'></div>");


            elem.after("<div style='display: none; position: absolute; z-index: 1000;'><div class='adn-member-list' id='" + elemname + "_usernolistdiv' style='display: none; position: absolute; z-index: 1000;'><ul><li class='default'><a href='javascript:void(0);' style='cursor: default;'>There are no matches</a></li><li class='default'><a href='javascript:void(0);' style='cursor: default;'>Is this spelled correctly?</a></li><li class='adp-li'><div class='aleft'>Did you want to add<br />    this person to the system?</div><div class='adp-arrow' onclick=Showuserdiv('tbxQuestMaster')></div></li></ul></div></div>");

            if (!$('.BackdropSelect_usertag').length) $('body').append('<div class="BackdropSelect_usertag">');

            var backdrop = $('.BackdropSelect_usertag');

            var userinput = elem.find("input");
            var userdiv = elem.children(".selected-user");
            var userlistprogress = elem.children(".gtu-main-div-progress");

            var userlistdiv = $("#" + elemname + "_userlistdiv")
            var usernolistdiv = $("#" + elemname + "_usernolistdiv")

            userlistdiv.hide();
            userlistprogress.hide();
            backdrop.hide();

            userinput.focus();

            userinput.autocomplete({
                source: function(request, response) {
                    if ($.trim(userinput.val()).length > 0) {

                        userlistprogress.show();

                        userlistdiv.empty();
                        var array = userlistarray;
                        var tLegnth = userlistarray.length;
                        var resultString = '';



                        if (tLegnth > 0) {
                            for (var i = 0; i < tLegnth; i++) {
                                if (i == 0) resultString = '<ul id="' + elemname + '_userlistdiv_ul">';
                                resultString += "<li id='" + elemname + "_userlistdivli_" + i + "' relname='" + (array[i].name) + "' relId='" + (array[i].id) + "'  ><div class='photo'><a href='javascript:void(0);'><img src='" + array[i]["imageurl"] + "' style='width:23px;height:23px;'></a></div><div class='name'><a href='javascript:void(0);'>" + (array[i].name) + "</a></div><div class='clearfix'></div></li>";
                            }
                            resultString += '</ul>';


                            userlistdiv.css({
                                "position": "absolute",
                                "top": userinput.offset().top + 28 + "px",
                                "left": userinput.offset().left + "px",
                            });



                            userlistdiv.append(resultString);
                            usernolistdiv.hide();
                            userlistdiv.show();
                            backdrop.show();
                        } else {
                            userlistdiv.hide();
                            usernolistdiv.show();
                            backdrop.show();
                        }

                        for (var i = 0; i < tLegnth; i++) {


                            $('#' + elemname + '_userlistdivli_' + i).on("click", function() {
                                var elnamerel = $(this).attr("relname");

                                userinput.before("<div>" + elnamerel + "<a href='javascript:void(0);' class='btnClose' >X</a></div>");
                                
                                userinput.val("");
                                userlistdiv.empty();
                                userlistdiv.hide();
                                userinput.attr('size', 3);
                                userinput.focus();
                                backdrop.hide();

                            });
                        }

                        userlistprogress.hide();
                        userlistdiv.show();
                        backdrop.show();
                    } else {
                        userlistdiv.hide();
                        backdrop.hide();
                    }
                }
            });


            elem.on("click", function() {
                userinput.focus();
            });

            backdrop.on("click", function() {
                userlistdiv.empty();
                userlistdiv.hide();
                userinput.focus();
                backdrop.hide();
            });

            userinput.on("keyup", function() {
                if ($.trim(userinput.val()) == "") {
                    userlistdiv.hide();
                }
            });

            userinput.keyup(resizeInput).each(resizeInput);



        });


    };

    $.fn.gtujs.defaults = {
        skipIds: "",
        backgroundColor: "white"
    };

    function resizeInput() {
        $(this).attr('size', $(this).val().length);
    }




})(jQuery);