
function HeroTitleMoveReplace(words){
	this.$container = $(".hero-title");
	this.currentWordIndex = 0;
	this.words = words;

	this.initialize = () => {
		setInterval(() => {
			if (this.currentWordIndex >= this.words.length-1)
				this.currentWordIndex = 0;
			else
				this.currentWordIndex++
			const currentWord = this.words[this.currentWordIndex];
			this.changeAnim(currentWord);
		}, 4000)
	}

	this.changeAnim = (word) => {
		this.setMoveOut();
		const replaceWord = this.replaceWord;
		const moveIn = this.moveIn;
		this.$container.on("transitionend webkitTransitionEnd oTransitionEnd", function(){
			replaceWord(word);
			moveIn();
		})
	}

	this.setMoveOut = () => {
		this.$container.addClass("move-out");
	}

	this.moveIn = () => {
		this.$container.removeClass("move-out");
	}

	this.replaceWord = (word) => {
		this.$container.find("span").text(word);
	}
}

function PScroll2(){
	this.$swiperWrapper = $(".p-scroll_nav-items");
	this.$scrollContainer = $(".p-scroll_nav");
	this.containerStartY = this.$scrollContainer.position().top;
	this.containerEndY = this.containerStartY + this.$scrollContainer.height();
	this.upperBound = this.$swiperWrapper[0].getBoundingClientRect().width - window.innerWidth;
	this.lowerBound = 0;
	this.progress = 0;
	this.target = 0;
	this.ease = 0.02;
	this.startY
	this.sliderWidth = null;
	this.itemWidth = null;
	this.scrollOffset = 800;

	this.lerp = (start, end, t) => {
		return start * (1-t) + end * t;
	}

	this.setTransform = (transform) => {
		if (this.$swiperWrapper)
			this.$swiperWrapper.css("transform", transform);
	}
	this.initialize = () =>{
		this.sliderWidth = this.upperBound;
		this.itemWidth = this.sliderWidth / this.$swiperWrapper.children().length;
	}

	this.update = () => {
		const currentY = window.scrollY;
		const scrollingDown = currentY > this.currentWinScrollY;
		const noScroll = currentY === this.currentWinScrollY;
		this.currentWinScrollY = currentY;
		const startScroll = this.containerStartY;
		const endScroll = this.containerEndY + this.scrollOffset;
		
			if(currentY <= endScroll && currentY >= startScroll){
				if(scrollingDown && !noScroll){
					console.log("scrolling down")
					if(!(this.current >= this.upperBound)){
						this.progress = parseFloat(this.lerp(this.progress, this.target, this.ease)).toFixed(2);
						this.target = currentY;
						this.setTransform(`translateX(-${this.progress}px)`)
					}
				}
				else if(!noScroll){
					console.log("scrolling up")
				}
		}
		requestAnimationFrame(this.update);
	}

}

function PScroll(){
	this.swiper = new Swiper(".swiper-container", {
					slidesPerView: "auto",
					allowTouchMove: false,
				})
	this.$scrollContainer = $(".p-scroll_nav");
	this.containerStartY = this.$scrollContainer.position().top;
	this.containerEndY = this.containerStartY + this.$scrollContainer.height() - window.innerHeight;
	this.currentWinScrollY = $(window).scrollTop();
	this.scrollProgress = 0;
	this.scrollFields = [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0];
	this.ease = 0.02;
	this.scrollSpeed = 300;
	this.waitOffset = 600;

	this.initialize = () => {
		this.swiper.setProgress(this.scrollProgress, 500);
		console.log(window.innerHeight)
	}

	this.lerp = (start, end, t) => {
		return start * (1-t) + end * t;
	}


	this.update = (y) => {
		const scrollingDown = y > this.currentWinScrollY;
		const startScroll = this.containerStartY;
		const endScroll = (this.containerEndY - this.waitOffset) - window.innerHeight;

		if(!this.scrollProgress)
			this.scrollProgress = 0;

		console.log(this.scrollProgress);
		if (scrollingDown){
			// checking if user is scrolling down and scroll progress isn't complete
			if(y >= startScroll && this.scrollProgress < 1){
				const currentScroll = (y-innerHeight)/endScroll * 1;
				this.scrollProgress = currentScroll;
				this.swiper.setProgress(this.scrollProgress, this.scrollSpeed)
			}	
		}
		else{
				if(y <= this.containerEndY && this.scrollProgress > 0){
					const currentScroll = (y-innerHeight-(this.waitOffset*2))/endScroll * 1;
					this.scrollProgress = currentScroll;
					this.swiper.setProgress(this.scrollProgress, this.scrollSpeed)	
				}
		}
		this.currentWinScrollY = y;
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
		$currentEl.addClass("active");
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
			}else{
				this.$locationsContainer.css("display", "flex");
				this.$carouselContainer.css("display", "none")
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
				const currentScroll = this.scale-this.scaleAdd;
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
const headerTitleMoveReplace = new HeroTitleMoveReplace(['Joy', 'Health', 'Peace', 'Purpose', 'Energy'])

pScroll.initialize();
locationArea.initialize();
baseStory.initialize();
imageParallax.initialize();
imageZoom.initialize();
headerTitleMoveReplace.initialize();

$(window).scroll(function(){
	const y = $(window).scrollTop();
	baseStory.update(y)
	imageZoom.update(y)
	imageParallax.update(y);
	pScroll.update(y)
})