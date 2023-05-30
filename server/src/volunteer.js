
function SetRandomCoordinates (position) {
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
// מייצר מספר אקראי בטווח מסויים
function GetRandomRange (min, max, round_num = 5) {
	return Number((Math.random() * (max - min) + min).toFixed(round_num));
}
