var sgTpl = require('./sg.handlebars');
var nosgTpl = require('./nosg.handlebars');
var API = require('./api');
var utils = require('./utils');
require('./jquery.cityselect');

var year = 2016;

var SG = {
	init: function(){
		this.initSelect();
		this.changeAllSG();
		this.filter();
		this.matchCount();
		this.like();
	},
	page: 1,
	initSelect: function(){
		var self = this;
		$('#city_select').citySelect({nodata:"none",required:false});

		$.ajax({
			url: API.getCategory,
			callback: 'callback',
			dataType: 'jsonp',
			success: function(json){

				var params = utils.getParams(),
					isInit = false;
					
				for(var p1 in json.heightArr){
					$('<option value="' + p1 + '">' + json.heightArr[p1] + '</option>').appendTo('[name=height]');
				}
				for(var p2 in json.weightArr){
					$('<option value="' + p2 + '">' + json.weightArr[p2] + '</option>').appendTo('[name=weight]');
				}
				for(var p3 in json.bustArr){
					$('<option value="' + p3 + '">' + json.bustArr[p3] + '</option>').appendTo('[name=bust]');
				}
				for(var p4 in json.typeArr){
					$('<option value="' + p4 + '">' + json.typeArr[p4] + '</option>').appendTo('[name=style]');
				}
				for(var p5 in json.companyArr){
					$('<option value="' + p5 + '">' + json.companyArr[p5] + '</option>').appendTo('[name=company]');
				}
				
				for(var p in params){
					if(params[p] !== ''){
						isInit = true;
						$('[name=' + p + '] option[value=' + params[p] + ']').attr('selected', true);
					}
				}
				params.year = year;
				isInit ? self.getSG('first', params) : self.getSG('init', {sponsor: 1, pageSize: 8, year: year});
			}
		})
	},
	fillArray: function(data){
		var len = data.length;
		if(len < 8){
			var d = {
				"id":0,
				"name":"",
				"company_id":0,
				"company_name":"",
				"sg_name":"",
				"sg_cup":"",
				"sg_weight":"",
				"sg_weixin":"",
				"sg_height":"",
				"province": "",
				"city": "",
				"likes":"",
				"shares":"",
				"sponsor":0,
				"thumb":"http://ue.17173cdn.com/a/news/chinajoy/2015/img/defaultsg.jpg"
			};

			for(var i = 0; i < (8 - len); i++){
				data.push(d);
			}
		}
		data.splice(4, 0, {isChange: true});
		return data;
	},
	getSG: function(type, obj){

		var self = this;
		$.ajax({
			url: API.getGoddess,
			type: 'GET',
			data: obj,
			dataType: 'jsonp',
			success: function(json){
				var data = json.data;
				self.total = json.total;
				self.pages = Math.ceil(json.total/json.pageSize);

				if(!data.length){
					$('.girl-bd').html(nosgTpl());
					return;
				}
				SG.sgArr = self.fillArray(data);

				if(type === 'init'){
					self.isEnd = false;
					$('#total_sg').text(json.total);
					$('#total_match').text(json.match);
					$('#match_success').text(json.match_success);
					
					// function randomSort(a, b){
					// 	return Math.random() - 0.5;
					// }
					// var sponsorArr = [],
					// 	normalArr = [];
					// for(var i = 0, len = data.length; i < len; i++){
					// 	if(data[i].sponsor === true){
					// 		sponsorArr.push(data[i]);
					// 	} else{
					// 		normalArr.push(data[i]);
					// 	}
					// }
					// sponsorArr.sort(randomSort);
					// normalArr.sort(randomSort);
					// SG.sgArr = sponsorArr.concat(normalArr);
					// SG.sgArr = self.fillArray(SG.sgArr);
					$('.girl-bd').html(sgTpl(SG.sgArr));
				} else if(type === 'change'){
					$('.girl-bd').html(sgTpl(SG.sgArr));
				} else if(type === 'first'){
					self.isEnd = false;
					$('.girl-bd').html(sgTpl(SG.sgArr));
				}

				pandora.use(['share'], function(Share) {
			        new Share({
			            element: '.share-box',
			            shareList: 'qq,tsina,weixin',
			            size: 'l',
			            shape: 'cir',
			            showLabel: false
			        });
			    });
			}
		}).done(function(){

		});		
	},
	changeSG: function(){
		var self = this; 
		$('.girl-bd').on('click', '.change', function(){
			var $this = $(this),
				$current = $this.parents('.item'),
				$nextAll = $('.girl-bd .item:hidden');
			if($nextAll.length <= 1 && self.page < self.pages){
				
				self.page++;
				var data = {
					page: self.page,
					pageSize: 8,
					height: $('#sg_filters [name=height]').val(),
					company: $('#sg_filters [name=company]').val(),
					style: $('#sg_filters [name=style]').val(),
					bust: $('#sg_filters [name=bust]').val(),
					weight: $('#sg_filters [name=weight]').val(),
					province: $('#sg_filters [name=weight]').val(),
					city: $('#sg_filters [name=city]').val(),
					year: year
				}
				var data2 = {
					page: self.page,
					pageSize: 8,
					year: year
				}
				
				self.isEnd ? self.getSG('change', data2) : self.getSG('change', data);

				
			} else if($nextAll.length <= 1 && self.page === self.pages){
				self.getSG('change', {year: year, pageSize:8});
				self.isEnd = true;
			}

			$nextAll = $('.girl-bd .item:hidden');


			if($current.hasClass('fl')){
				$nextAll.eq(0).addClass('fl').show().insertAfter($current);
			} else{
				$nextAll.eq(0).addClass('fr').show().insertAfter($current);
			}
			
			$current.remove();
		})		
	},
	changeAllSG: function(){
		var self = this;

		$('.girl-bd').on('click', '#change_sg', function(){
			if(self.page < self.pages){
				self.page++;
				var data = {
					page: self.page,
					height: $('#sg_filters [name=height]').val(),
					company: $('#sg_filters [name=company]').val(),
					style: $('#sg_filters [name=style]').val(),
					bust: $('#sg_filters [name=bust]').val(),
					weight: $('#sg_filters [name=weight]').val(),
					province: $('#sg_filters [name=weight]').val(),
					city: $('#sg_filters [name=city]').val(),
					year: year,
					pageSize: 8
				}
				var data2 = {
					page: self.page,
					pageSize: 8,
					year: year
				}

				self.isEnd ? self.getSG('change', data2) : self.getSG('change', data);				
			} else{
				self.page = 1;
				self.getSG('change', {year: year, pageSize:8, page: 1});
				self.isEnd = true;
			}
		})
	},
	filter: function(){
		var self = this;
		$('#sg_filters select').each(function(){
			var $this = $(this);
			$this.change(function(e) {
				self.page = 1;
				self.getSG('first', $('#sg_filters').serialize() + '&year=' + year + '&pageSize=8');
			});
		})		
	},
	like: function(){
		$(document).on('click', '.support-num, .option-zang', function(){
			var $this = $(this),
				num = parseInt($this.find('.num').text()) || parseInt($this.text()),
				id = $this.parents('.girl-item').attr('data-id') || $this.parents('.gb-list2-item').attr('data-id');
			$.ajax({
				url: API.like,
				data: {id: id, year: year},
				dataType: 'jsonp',
				success: function(json){
					if(json.status == 1){
						if($this.hasClass('support-num')){
							$this.html('<i class="ico1 ico1-heart-red-s"></i> <span class="num">' + (num + 1) + '</span>');
						} else{
							$this.html('<i class="ico ico-zang ico-yzang"></i>' + (num + 1));
						}
					} else{
						alert(json.msg);
					}
				}
			})
		})
	},
	matchCount: function(){
		$(document).on('click', '.onlyone', function(){
			var id = $(this).attr('data-id');
			$.ajax({
				url: API.matchCount,
				dataType: 'jsonp',
				data: {id: id, year: year},
				success: function(json){
					
				}
			})

			var $this = $(this),
				num = parseInt($this.parents('.support-box').find('.num').text());

			$.ajax({
				url: API.like,
				data: {id: id, year: year},
				dataType: 'jsonp',
				success: function(json){
					if(json.status == 1){
						$this.parents('.support-box').find('.option-zang').html('<i class="ico ico-red-love"></i><span class="num">' + (num + 1) + '</span>');
					}
				}
			})

		})
	}
}

module.exports = SG;

// $(function(){
// 	SG.init();
// })