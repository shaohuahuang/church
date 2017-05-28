var util = {
	isMorning: function(time){
		return time.indexOf('am') > 0;
	},
	
	compareTime: function(time1, time2){
		if(this.isMorning(time1)&&!this.isMorning(time2))
			return -1
		if(!this.isMorning(time1)&&this.isMorning(time2))
			return 1
		var time1_hour, time1_min, time2_hour, time2_min;
		
		if(time1.indexOf(':')==-1){
			time1_hour = time1.substring(0, time1.length-2);
			time1_min = 0;
		}else{
			var array = time1.split(':');
			time1_hour = array[0];
			time1_min = array[1].substring(0,array[1].length-2);
		}
		
		if(time2.indexOf(':')==-1){
			time2_hour = time2.substring(0, time2.length-2);
			time2_min = 0;
		}else{
			var array = time2.split(':');
			time2_hour = array[0];
			time2_min = array[1].substring(0,array[1].length-2);
		}
		
		time1_hour = parseFloat(time1_hour);
		time2_hour = parseFloat(time2_hour);
		time1_min = parseFloat(time1_min);
		time2_min = parseFloat(time2_min);
		
		if(time1_hour==12&&time2_hour==12)
			return time1_min - time2_min;
		if(time1_hour==12)
			return -1;
		if(time2_hour == 12)
			return 1;
		if(time1_hour<time2_hour)
			return -1
		else if(time1_hour == time2_hour)
			return time1_min - time2_min;
		else
			return 1;
	}
};

export default util;