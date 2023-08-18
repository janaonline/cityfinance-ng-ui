export class DeviceUtility {
	public isUserOnMobile() {
		return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
			navigator.userAgent
		);
	}

	public isMobile(){
		return (navigator.maxTouchPoints || 'ontouchstart' in document.documentElement);
	};
}
