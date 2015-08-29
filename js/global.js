$(function(){
	//initialize superbox
	$('.superbox').SuperBox();

	//superbox image selecting1
	var checkSuperboxSelected = function(){
		$('#superbox-gallery .img-view .checkbox :checkbox').each(function() {
			var el = $(this);

			if (! el.is(':checked')) {
				enableToolsSuperbox(false);
			}
			else {
				el.parents('.img-view').addClass('selected');
				enableToolsSuperbox(true);
			}
		});
	};

	$('#superbox-gallery .img-view .checkbox').click(function(){
		var el = $(this);

		if (! el.find(':checkbox').is(':checked')) {
			el.parents('.img-view').removeClass('selected');
			enableToolsSuperbox(false);
		}
		else {
			el.parents('.img-view').addClass('selected');
			enableToolsSuperbox(true);
		}
	});

	$('#superbox-gallery #selectall').click(function(){
		if($(this).prop('checked')) {
			$(this).parents('.tile').each(function(){
				$(this).find('.img-view .checkbox :checkbox').prop('checked',true);
				$(this).find('.img-view').addClass('selected');
			});
			enableToolsSuperbox(true);
		}
		else {
			$(this).parents('.tile').each(function(){
				$(this).find('.img-view .checkbox :checkbox').prop('checked',false);
				$(this).find('.img-view').removeClass('selected');
			});
			enableToolsSuperbox(false);
		}
	});

	var enableToolsSuperbox = function(enable) {
		if (enable) {
			$('#superbox-gallery .gallery-tool').removeClass('disabled');
		}
		else {
			var selected = false;

			$('#superbox-gallery .superbox .img-view').each(function(){
				if ($(this).hasClass('selected')) {
				  selected = true;
				}
			});

			if(!selected) {
				$('#superbox-gallery .gallery-tool').addClass('disabled');
			}
		}
	}

	checkSuperboxSelected();

	/* initialize colorbox */
	$('.colorbox .colorbox-list .overlay').colorbox({
		photo: true,
		opacity: .9, 
		rel:'group1',
		scalePhotos:true,
		scrolling:false,
		maxWidth:'100%',
		maxHeight:'100%',
		transition: 'elastic',
		href: function(){
			var url = $(this).prev().data('img');
			return url;
		},
	});

	//colorbox image selecting
	var checkColorboxSelected = function(){
		$('#colorbox-gallery .img-view .checkbox :checkbox').each(function() {
			var el = $(this);

			if (! el.is(':checked')) {
				enableToolsColorbox(false);
			}
			else {
				el.parents('.img-view').addClass('selected');
				enableToolsColorbox(true);
			}
		});
	};

	$('#colorbox-gallery .img-view .checkbox').click(function(){
		var el = $(this);
		
		if (! el.find(':checkbox').is(':checked')) {
			el.parents('.img-view').removeClass('selected');
			enableToolsColorbox(false);
		}
		else {
			el.parents('.img-view').addClass('selected');
			enableToolsColorbox(true);
		}
	});

		$('#colorbox-gallery #selectall2').click(function(){
			if ($(this).prop('checked')) {
				$(this).parents('.tile').each(function(){
					$(this).find('.img-view .checkbox :checkbox').prop('checked',true);
					$(this).find('.img-view').addClass('selected');
				});

				enableToolsColorbox(true);
			}
			else {
				$(this).parents('.tile').each(function(){
					$(this).find('.img-view .checkbox :checkbox').prop('checked',false);
					$(this).find('.img-view').removeClass('selected');
				});

				enableToolsColorbox(false);
			}
		});

		var enableToolsColorbox = function(enable) {

		if (enable) {
			$('#colorbox-gallery .gallery-tool').removeClass('disabled');
		}
		else {
			var selected = false;

			$('#colorbox-gallery .colorbox .img-view').each(function(){
				if ($(this).hasClass('selected')) {
					selected = true;
				}
			});

			if(!selected) {
				$('#colorbox-gallery .gallery-tool').addClass('disabled');
			}
		}

		checkColorboxSelected();

		$('.img-view .media-info .btn.dropdown-toggle').on('click', function(e){
			$(this).next().toggle();
			e.stopPropagation();
		});

		$('.img-view .media-info .dropdown-menu').on('click', function(e){
			e.stopPropagation();
			$(this).toggle();
		});

		$('.img-view .media-info .checkbox').on('click', function(e){
		e.stopPropagation();
	});
    }
});