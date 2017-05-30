"use strict"
export const actions = {
	COLLATE_LECTURES: "COLLATE_LECTURES"
}

export function collateLectures(maleLectures, femaleLectures){
	return {
		type: actions.COLLATE_LECTURES,
		data: {
			maleLectures,femaleLectures
		}
	}
}