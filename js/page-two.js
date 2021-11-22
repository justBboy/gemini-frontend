
function PScroll(){
	this.swiper = new Swiper(".swiper-container", {
					slidesPerView: "auto",
					allowTouchMove: false
				})
	this.$scrollContainer = $(".p-scroll_nav");
	this.containerStartY = this.$scrollContainer.position().top;
	this.containerEndY = this.containerStartY + this.$scrollContainer.height();
	this.currentWinScrollY = $(window).scrollTop();
	this.scrollProgress = 0;
	this.waitOffset = 800;

	this.initialize = () => {
		this.swiper.setProgress(this.scrollProgress, 500);
	}

	this.update = (y) => {
		const scrollOffset = 200;
		const scrollingDown = y > this.currentWinScrollY;
		this.currentWinScrollY = y;
		const startScroll = this.containerStartY - scrollOffset;
		const endScroll = this.containerEndY + scrollOffset;

		if (scrollingDown){
			// checking if user is scrolling down and scroll progress isn't complete
			if(y >= startScroll && this.scrollProgress < 1){
				const currentScroll = ( (y/(this.containerEndY - this.waitOffset)) * 1)
				this.scrollProgress = currentScroll;
				this.swiper.setProgress(this.scrollProgress, 500)
			}	
		}
		else{
				if(y <= this.containerEndY - this.waitOffset && this.scrollProgress > 0){
					const currentScroll = ((y - this.containerStartY)/(this.containerEndY)) * 1;
					console.log(currentScroll)
					this.scrollProgress = currentScroll;
					this.swiper.setProgress(this.scrollProgress, 500)
				}
		}
		
	}
}


function LocationsArea(){
	this.$locationItems = $(".location-item");
	this.$locationImages = $(".locations-image .base_image");
	this.$locationsBackground = $(".locations-background .background-image");
	this.$locationsContainer = $(".locations-container");
	this.$carouselContainer = $(".locations-carousel");
	this.swiper = new Swiper(".locations-swiper", {
		allowTouchMove: true,
		slidesPerView: "auto"
	})

	this.replaceActiveImg = (target) => {
			const $activeEl = this.$locationImages.find('.active');
			const $currentEl = this.$locationImages.find(`#${target}`);

			$activeEl.removeClass("active");
			$currentEl.addClass("active")
	}

	this.replaceActiveDescription = (target) => {
		const $activeEl = $(".locations-image .image-caption.active");
		const $currentEl = $(`.locations-image .image-caption[data-id=${target}]`);

		$activeEl.removeClass("active");
		setTimeout(function(){
			$currentEl.addClass("active");
		}, 500)
	}

	this.replaceBackgroundImages = (target) => {
		const $activeEl = this.$locationsBackground.find(".active");
		const $currentEl = this.$locationsBackground.find(`img[data-id=${target}]`);

		$activeEl.removeClass("active");
		$currentEl.addClass("active")
	}

	this.checkSwitchToCarousel = () => {
		if(this.$locationsContainer && this.$carouselContainer){
			if (window.innerWidth < 1024){
				this.$locationsContainer.css("display", "none");
				this.$carouselContainer.css("display", "block")
			}
		}
	}

	this.initialize = () => {
		const locationItems = this.$locationItems;
		const locationImages = this.$locationImages;
		const replaceActiveImg = this.replaceActiveImg;
		const replaceActiveDescription = this.replaceActiveDescription
		const replaceBackgroundImages = this.replaceBackgroundImages;
		const checkSwitchToCarousel = this.checkSwitchToCarousel

		this.checkSwitchToCarousel();
		$(window).scroll(function(){
			checkSwitchToCarousel();
		})

		this.$locationItems.mouseover(function(){
			const target = $(this).data("target-id");

			locationItems.find(".location-title.active").removeClass('active');
			$(this).find(".location-title").addClass('active');

			replaceActiveImg(target);
			replaceActiveDescription(target);
			replaceBackgroundImages(target)
		})
	}
}


function BaseStory(){
	this.$wrapper = $(".promo-tiles .promo-wrapper");
	this.startY = this.$wrapper.offset().top;
	this.endY = this.startY + this.$wrapper.height();
	this.currentWinScroll = $(window).scrollTop();
	this.scrollProgress = 0;
	this.scrollOffset = 800;
	this.waitOffset = 500;

	this.setNewScroll = (progress) => {
		this.scrollProgress = progress;
		if(this.$wrapper)
			this.$wrapper.css("transform", `translateX(${this.scrollProgress}rem)`)
	}
	this.initialize = () => {
		this.setNewScroll(0)
	}

	this.update = (y) => {
		const scrollingDown = y > this.currentWinScrollY;
		this.currentWinScrollY = y;
		const startScroll = this.startY - this.scrollOffset;
		const endScroll = this.endY + this.scrollOffset;


		if(scrollingDown){
			if(y >= startScroll && this.scrollProgress <= 10){
				const currentScroll = -((y/endScroll) * 10)
				console.log(currentScroll);
				this.setNewScroll(currentScroll);
			}	
		}
		else{
			if(y <= this.endY && this.scrollProgress > -10){
				const currentScroll = ((y - this.startY)/this.endY) * 10;
				this.setNewScroll(currentScroll)
			}
		}
		
	}
}


function ImageParallax(){
	this.$parallaxContainer = $(".promo-image .p-parallax");
	this.startY = this.$parallaxContainer.offset().top;
	this.endY = this.startY + this.$parallaxContainer.height();
	this.currentWinScroll = $(window).scrollTop();
	this.scaleAdd = 0.002;
	this.scale = 1.02;
	this.scrollOffset = 800;
	this.waitOffset = 500;

	this.initialize = () => {
		this.updateScale(this.scale);
	}

	this.updateScale = (currentScroll) => {
		this.scale = currentScroll;
		this.$parallaxContainer.css("transform", `scale(${this.scale})`);
	}

	this.update = (y) => {
		const scrollingDown = y > this.currentWinScrollY;
		this.currentWinScrollY = y;
		const startScroll = this.startY - this.scrollOffset;
		const endScroll = this.endY + this.scrollOffset;
		if(scrollingDown){
			if(y >= startScroll && this.scale <= 1.1){
				const currentScroll = this.scale + this.scaleAdd;
				this.updateScale(currentScroll);
			}
		}
		else{
			if(y <= endScroll && this.scale >= 1.02){
				const currentScroll = this.scale - this.scaleAdd;
				this.updateScale(currentScroll);
			}
		}
	}
}

function ImageZoomOut(){
	this.$imageFrame = $(".base-testimonial .testimonial-frame");
	this.startY = this.$imageFrame.offset().top;
	this.endY = this.startY + this.$imageFrame.height();
	this.currentWinScroll = $(window).scrollTop();
	this.scaleAdd = 0.04;
	this.scale = 1.02;
	this.scaleUpperBound = 2.75;
	this.scrollOffset = 800;
	this.waitOffset = 200;
	this.zoomComplete = false;


	this.initialize = () => {
		this.updateScale(this.scale);
	}

	this.updateScale = (currentScroll) => {
		this.scale = currentScroll;
		if (this.scale >= this.scaleUpperBound)
			this.zoomComplete = true;
		this.$imageFrame.css("transform", `scale(${this.scale})`);
	}

	this.update = (y) => {
		const scrollingDown = y > this.currentWinScrollY;
		this.currentWinScrollY = y;
		const startScroll = this.startY - this.scrollOffset;
		const endScroll = this.endY + this.scrollOffset;
		if(scrollingDown){
			if(y >= startScroll && this.scale <= this.scaleUpperBound && !this.zoomComplete){
				const currentScroll = this.scale + this.scaleAdd;
				this.updateScale(currentScroll);
			}
		}
		else{
			if(y <= endScroll && this.scale >= 1.02 && !this.zoomComplete){
				const currentScroll = this.scale - this.scaleAdd;
				this.updateScale(currentScroll);
			}
		}
	}	
}


const pScroll = new PScroll();
const locationArea = new LocationsArea();
const baseStory = new BaseStory();
const imageParallax = new ImageParallax();
const imageZoom = new ImageZoomOut();

pScroll.initialize();
locationArea.initialize();
baseStory.initialize();
imageParallax.initialize();
imageZoom.initialize();

$(window).scroll(function(){
	const y = $(window).scrollTop();
	pScroll.update(y);
	baseStory.update(y)
	imageZoom.update(y)
	imageParallax.update(y);
})