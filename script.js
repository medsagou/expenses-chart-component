
fetch('./data.json')
    .then((response) => response.json())
    .then((data) =>  {
      putDaysInLabel(data);
      const heightArray=heightArrayCalc(data);
      console.log(heightArray);
      putComlumnSizes(heightArray);
      let amounts=getAmounts(data);
      changeVarTitle(amounts)
      changeColorOfMaxColumn(data);
          });


// just the last 7 days
function lastSevenDays(arr){
  objAppend={'day':'***', 'amount':0};
  if (arr.length > 7) {
    const M=arr.length-7;
    for(let i=0 ; i < M ; i++) {
      arr.shift();
    }
  }else if (arr.length < 7) {
    const M=7-arr.length;
    for(let i=0 ; i < M ; i++) {
      arr.push(objAppend)
    }
  }
  return arr;
}



// claculate the height of each column
 function heightCalc(amount, maxAmount,colHeight){
  return (amount*colHeight)/maxAmount
}

//get amounts
function getAmounts(data){
  const amounts=[];
  for(let i=0; i<data.length ; i++){
    amounts.push(data[i].amount)
  }
  return amounts;
}
// clac max of the seven days
function maxAmount(data){
  const amounts=getAmounts(data);
  max=-Infinity;

  for(let element of amounts){
    if (max < element){
      max=element
    }
  }
  return max;
}

// put every day of the last 7 days in the graphe label
function putDaysInLabel(data){
  data=lastSevenDays(data);
  for(let i=0 ; i < 7 ; i++){
    var d = i+1;
    var day='day' + d;
    document.getElementById(day).innerHTML=data[i].day;
  }
}
// clac size of column and the label content
function heightArrayCalc(data){
  var heights=[];
  const maxOfAmounts=maxAmount(data);
  const amounts=getAmounts(data);
  for(let element of amounts){
    if (element === 0 || element==='0' || element < 0){
      heights.push(0);
    } else {
      let h = heightCalc(element,maxOfAmounts,6);
      heights.push(h)

    }
  }
  return heights;
}

// put every size in column
function putComlumnSizes(heights){
  for (let i=0; i<heights.length ; i++){
    let r=i+1
    let colId= 'col'+r;
    document.getElementById(colId).style.height=heights[i]+'rem';
  }
}

// change the subTitle element
function changeVarTitle(columnTitles){
  for(let i=0 ; i < columnTitles.length ; i++){
    let r=i+1;
    let colId='col' + r;
    document.getElementById(colId).title='$'+columnTitles[i];
  }
}

//get index of the max
function getIndexOfMax(data) {
  const amounts=getAmounts(data);
  let max=-Infinity;
  let d=0;

  for(let element of amounts){
    if (max < element){
      max=element
    }
  }
  return amounts.indexOf(max);
}
// change the color of the max column
function changeColorOfMaxColumn(data){
  const index=getIndexOfMax(data) + 1;
  const colId= 'col' + index;
  document.getElementById(colId).style.backgroundColor='var(--primary-100)';
  document.getElementById(colId).addEventListener("mouseover",function() { mouseOver(colId)});
  document.getElementById(colId).addEventListener("mouseout", function() {mouseOut(colId)});
}


function mouseOver(colId) {
  document.getElementById(colId).style.backgroundColor = 'var(--primary-50)';
}

function mouseOut(colId) {
  document.getElementById(colId).style.backgroundColor = 'var(--primary-100)';
}