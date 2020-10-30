
    //concat() – 将两个或多个字符的文本组合起来，返回一个新的字符串。
    var str = "Hello";
    var out = str.concat(" World","!");
    console.log(str); //Hello
    console.log(out); //Hello World! 

    //charAt() – 返回指定位置的字符。 
    var str = "HelloString";
    var out = str.charAt(1);
    console.log(out); //e


    //charCodeAt() – 返回在指定的位置的字符的 Unicode 编码。
    var str = "HelloString";
    var out = str.charCodeAt(5);
    console.log(out); //83


    //indexOf(searchvalue,fromindex) – 返回字符串中一个子串第一处出现的索引，如果没有匹配项，返回 -1 。 
    //fromindex是可选的整数参数。规定在字符串中开始检索的位置。它的合法取值是 0 到 stringObject.length - 1。
    //如省略该参数，则将从字符串的首字符开始检索,此时indexOf()跟search()方法类似。
    var str = "HelloStringend";
    console.log(str.indexOf("e")); //1
    console.log(str.indexOf("e",2)); //11

        
    //lastIndexOf(searchvalue,fromindex) – 返回字符串中一个子串最后一处出现的索引，如果没有匹配项，返回 -1 。 
    //如果在 stringObject 中的 fromindex 位置之前存在 searchvalue，则返回的是出现的最后一个 searchvalue 的位置。
    var str = "HelloString";
    console.log(str.lastIndexOf("l")); //3
    console.log(str.lastIndexOf("l", 1)); //-1
    console.log(str.lastIndexOf("l", 2)); //2
    console.log(str.lastIndexOf("l", 3)); //3


    //substring(start,end) – 返回一个新的字符串,包括 start 处的字符,但不包括 end 处的字符,其长度为 end 减 start
    //substring是以两个参数中较小一个作为起始位置，较大的参数作为结束位置。
    //注意：如果参数是负数，substring则会将负参数都直接转换为0，如果仅有一个参数，则从start开始到末尾。 
    var str = "HelloExample";
    console.log(str); //HelloExample
    console.log(str.substring(1, 3)); //el
    console.log(str.substring(3, 1)); //el
    console.log(str.substring(2)); //lloExample
    console.log(str.substring(-1)); //HelloExample
    console.log(str.substring(-1, -3)); //空字符串
    console.log(str.substring(-1, 5)); //Hello


    //substr(start [,length]) – 返回一个新的字符串,从起始索引号提取字符串中指定数目的字符。
    //如果仅有一个参数，则从start开始到末尾。
    //当接收的参数是负数时,substr是将第一个参数与字符串长度相加后的结果作为第一个参数
    var str = "HelloExample";
    console.log(str); //HelloExample
    console.log(str.substr(1, 3)); //ell
    console.log(str.substr(2, -1)); //空字符串
    console.log(str.substr(1)); //elloExample
    console.log(str.substr(-4, 2)); //mp
    console.log(str.substr(-3)); //ple


    //stringObject.slice(start,end) 返回一个新的字符串,包括 start 处的字符,但不包括 end 处的字符,其长度为 end 减 start
    //当接收的参数是负数时，slice会将它字符串的长度与对应的负数相加，结果作为参数。如果仅有一个参数，则从start开始到末尾。
    var str = "HelloExample";
    console.log(str); //HelloExample
    console.log(str.slice(1, 3)); //el
    console.log(str.slice(2)); //lloExmaple
    console.log(str.slice(3, 1)); //空字符串
    console.log(str.slice(-4, -1)); //mpl
    console.log(str.slice(-4, 0)); //空字符串
    console.log(str.slice(-1, -4)); //空字符串
    console.log(str.slice(1, -4)); //elloExa


    //toLowerCase() – 将整个字符串转成小写字母。
    //toLowerCase() – 将整个字符串转成小写字母。
    var str = "How Are you";
    console.log(str.toLowerCase()); //how are you
    console.log(str.toUpperCase()); //HOW ARE YOU


    /***********************************************/
    /********支持正则表达式的 String 对象的方法*****/
    /***********split,match,replace,search**********/
    /***********************************************/
    //stringObject.split(separator,howmany),返回一个字符串数组。该数组是通过在 separator 指定的边界处将字符串 stringObject 分割成子串创建的。返回的数组中的字串不包括 separator 自身。
    var str = "How are you doing today";
    console.log(str.split(" ")); //["How", "are", "you", "doing", "today"]
    console.log(str); //How are you doing today
    console.log(str.split("")); //["H", "o", "w", " ", "a", "r", "e", " ", "y", "o", "u", " ", "d", "o", "i", "n", "g", " ", "t", "o", "d", "a", "y"] 
    console.log(str.split("", 3)); //["H", "o", "w"]
    console.log(str.split("a.text.json")); //["How ", "re you doing tod", "y"]
    console.log(str.split("good")); //["How are you doing today"]
    var str = "a_db-c(d+e";
    console.log(str.split(/[^a-z]/i)); //["a", "db", "c", "d", "e"] 


    /** match(searchvalue) 或 match(regexp)检查一个字符串是否匹配一个正则表达式。返回存放匹配结果的数组。
    match() 方法将检索字符串 stringObject，以找到一个或多个与 regexp 匹配的文本。这个方法的行为在很大程度上有赖于 regexp 是否具有标志 g。
    如果 regexp 没有标志 g，那么 match() 方法就只能在 stringObject 中执行一次匹配。如果没有找到任何匹配的文本， match() 将返回 null。否则，它将返回一个数组，其中存放了与它找到的匹配文本有关的信息。该数组的第 0 个元素存放的是匹配文本，而其余的元素存放的是与正则表达式的子表达式匹配的文本。除了这些常规的数组元素之外，返回的数组还含有两个对象属性。index 属性声明的是匹配文本的起始字符在 stringObject 中的位置，input 属性声明的是对 stringObject 的引用。
    如果 regexp 具有标志 g，则 match() 方法将执行全局检索，找到 stringObject 中的所有匹配子字符串。若没有找到任何匹配的子串，则返回 null。如果找到了一个或多个匹配子串，则返回一个数组。不过全局匹配返回的数组的内容与前者大不相同，它的数组元素中存放的是 stringObject 中所有的匹配子串，而且也没有 index 属性或 input 属性。
    **/
    var str = "Hello world! Hello";
    console.log(str.match("lo")); //["lo"] { index: 3, input: "Hello world! Hello" }
    console.log(str.match("world")); //["world"] { index: 6, input: "Hello world! Hello" }
    console.log(str.match("world").index); //6
    console.log(str.match(/Hello/g)); //["Hello", "Hello"]
    console.log(str.match("World")); //null
    var str = "1 plus 2 equal 3";
    console.log(str.match(/\d+/g)); //["1", "2", "3"]


    //replace() 方法用于在字符串中用一些字符替换另一些字符，或替换一个与正则表达式匹配的子串。
    //stringObject.replace(regexp/substr,replacement),返回一个新的字符串，是用 replacement 替换了 regexp 的第一次匹配或所有匹配之后得到的。
    //replacement 可以是字符串，也可以是函数。如果它是字符串，那么每个匹配都将由字符串替换。但是 replacement 中的 $ 字符具有特定的含义，它说明从模式匹配得到的字符串将用于替换。
    //  $1、$2、...、$99----与 regexp 中的第 1 到第 99 个子表达式相匹配的文本。
    //  $&------------------与 regexp 相匹配的子串。
    //  $`------------------位于匹配子串左侧的文本。
    //  $'------------------位于匹配子串右侧的文本。
    //  $$------------------直接量符号。
    var str = "Visit HangZhou";
    console.log(str); //Visit HangZhou
    console.log(str.replace(/Hang/g, "Su")); //Visit SuZhou
    var str = "1 plus 2 equal 3";
    console.log(str); //1 plus 2 equal 3
    console.log(str.replace(/(\d)/g, "*"));  //* plus * equal *

    var str = "as An angle";
    console.log(str.replace(/a/, "b")); //bs An angle
    console.log(str.replace(/a/g, "b")); //bs An bngle
    console.log(str.replace(/a/gi, "b")); //bs bn angle

    var str = "Karl,John";
    console.log(str.replace(/(\w+)\s*,\s*(\w+)/, "$2,$1")); //John,Karl

    var str = '"ab", "b"';
    console.log(str.replace(/"([^"]*)"/g, "'$1'")); //'ab', 'b' 

    var str = "aaa bbb ccc";
    console.log(str.replace(/\b\w+\b/g, function (w) {
        return w.substring(0, 1).toUpperCase() + w.substring(1);
    })); //Aaa Bbb Ccc 


    //search() – 执行一个正则表达式匹配查找。如果查找成功，返回字符串中匹配的索引值。否则返回 -1 。 
    //stringObject.search(regexp) 返回stringObject 中第一个与 regexp 相匹配的子串的起始位置。
    //此方法跟indexOf类似。此方法会忽略g标识
    var str = "Visit HangZhou";
    console.log(str) //Visit HangZhou
    console.log(str.search(/Hang/)); //6
    console.log(str.search(/hang/)); //-1
    console.log(str.search(/hang/i)); //6
    var str = "1 plus 2 equal 3";
    console.log(str) //1 plus 2 equal 3
    console.log(str.search(/\d/g)); //0

