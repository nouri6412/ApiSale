
	function addZeros(str, n)
	{
		for (let i = 0; i < n; i++)
		{
			str = "0" + str;
		}
		return str;
	}
	
	// Function to return the XOR
	// of the given strings
	function getXOR(a, b)
	{
	
		// Lengths of the given strings
		let aLen = a.length;
		let bLen = b.length;
	
		// Make both the strings of equal lengths
		// by inserting 0s in the beginning
		if (aLen > bLen)
		{
			a = addZeros(b, aLen - bLen);
		}
		else if (bLen > aLen)
		{
			a = addZeros(a, bLen - aLen);
		}
	
		// Updated length
		let len = Math.max(aLen, bLen);
	
		// To store the resultant XOR
		let res = "";
		
		for (let i = 0; i < len; i++)
		{
			if (a[i] == b[i])
				res += "0";
			else
				res += "1";
		}
		return res;
	}
	
	let a = "Ab/Wy75w6Kq055bCxtwjNmTSSwU0qPJTr+mq7Mt7j0D4NXm3UhJaVjV6OwQxAtTZA+COAFB2/hTkfwhToEesmJyuIv2i0ZTXh1ik1ZGdbKzYOM2IS4277xJ+2Mm+UhV4YNQ3VpWkHA9YcOclSJi+kw1LDfSEAI8NtEOUdYX5HhJpiTt1SdVqDBeoc6vzcNJLvZp9eWB3o4ymh41uIRqEItIkl5X/OYxM3PIHQraC5SJZZJiK7qG6CW2/UvSnmHRmYLLVZq8lvGFoVQB+bSc/uhmItCkg6ILygWJhh4pMbc1W5+u2Ofk4Glgith1dqx3uCpCT32OkGCR7lIcxh3m3fg==", b = "DnBVxHZdbiFhWFSY";
	
	console.log(getXOR(a, b));
	
