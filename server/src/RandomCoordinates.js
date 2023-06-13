
/**
 * פונקציה זו מייצרת תזוזות קטנות במיקום,
 * ע"מ לייצר אשלייה של תנועה
 */

function setRandomCoordinates (position) {
	let random_num = GetRandomRange(0.000001, 0.000009);

	// הסתברות של 0.5 למספר שלילי
	if (Math.random() > 0.5) {
		random_num = MakeNumberNegative(random_num);
	}

	// הסתברות של 0.5 כדי לקבוע האם לשנות את האורך או את הרוחב
	if (Math.random() > 0.5) {
		position.lat += random_num;
	} else {
		position.lng += random_num;
	}

	return position;

	// הופך מספר לשלילי
	function MakeNumberNegative (num) {
		return num - (num * 2);
	}
}

function setRandomStatus (status) {
	if (Math.random() > 0.2) {
		if (Math.random() > 0.5) {
			return 'SOS';
		} else {
			return 'ALERT';
		}
	} else {
		return 'OK';
	}
}

// מייצר מספר אקראי בטווח מסויים
function GetRandomRange (min, max, round_num = 5) {
	return Number((Math.random() * (max - min) + min).toFixed(round_num));
}

export {
	setRandomCoordinates,
	GetRandomRange,
	setRandomStatus
};
