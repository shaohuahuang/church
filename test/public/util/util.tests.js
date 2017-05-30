"use strict";
import util from '../../../public/util/util';
import {assert} from 'chai';
describe('test util.js', ()=>{
	it('test isMorning', ()=>{
		assert.equal(util.isMorning("10:00am"), true);
	});
	
	describe("test parse related functions", ()=>{
		it("test parse", ()=>{
			let lectures = "SS \n\
			4pm, Phebe,  7 Steps Laws,  Yi Xin,  Church \n\
			\n\
			SS+ \n\
			830am, Clenyce,  Flood, PW, Christianne, Bishan\n\
			\n\
			12pm, Jin Yi, Spiritual Tour 2016 Msg, AJ, Church \n\
			\n\
			Campus \n\
			10am, Qiaoxin, Joshua , Lin rui \n\
			\n\
			11am, Hai Yun, Predestination, PPWL \n\
			\n\
			1.30pm, Kai Tian, Joshua, Violet, Joycelyn, Nex \n\
			\n\
			2pm, Cher, Predestination,  Yi Xin, Church \n\
			\n\
			3pm, Cheryl, Revision, PPWL \n\
			\n\
			Career \n\
			11am, Minshan, Conflict of Ignorance, Yingying, Peiyu, HillV2\n";
			
			let result = util.parse(lectures);
			assert.deepEqual(result["SS"][0].join(","), "4pm,Phebe,7 Steps Laws,Yi Xin,Church");
			assert.deepEqual(result["SS+"][1].join(","), "12pm,Jin Yi,Spiritual Tour 2016 Msg,AJ,Church");
		});
	})
	
	describe('test get sitins', ()=>{
		it('no sit-in', ()=>{
			let lecture = ["2pm", "Cher", "Predestination",  "Yi Xin", "Church"];
			assert.equal(util.getSitins(lecture),"-");
		});
		it('one sit-in', ()=>{
			let lecture = ["2pm", "Cher", "Predestination",  "Yi Xin", "Violet", "Church"];
			assert.equal(util.getSitins(lecture),"Violet");
		});
		it("two sit-ins", ()=>{
			let lecture = ["2pm", "Cher", "Predestination",  "Yi Xin", "Violet","Jia Wen", "Church"];
			assert.equal(util.getSitins(lecture),"Violet,Jia Wen");
		})
	})
});