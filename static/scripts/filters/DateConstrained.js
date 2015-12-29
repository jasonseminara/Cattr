cattr.filter('dateConstrained', function(){
  
  var isDate = (d)=> d instanceof Date && !isNaN(d.valueOf());
  
  return function(input,dates){
    
    var filtered = input || [];
    if (!dates) return filtered;
    
    // todo: change this so it actually filters out the out-of-range reservations on each cat. 
    // filter over the cats to find any items who have dates within our range.
    return filtered.filter( function(item) {

      // filter out those cats who don't meet the date criteria. 
      return item.availability.filter( function(avail){
        
        // if the reservation is already taken, let's dump it
        if (avail.host_id) return;

        var inStart = isDate(dates.start) ? dates.start <= new Date(avail.start) : true;
        var inEnd   = isDate(dates.end)   ? dates.end   >= new Date(avail.end)   : true;

        return inStart && inEnd;
      }).length;
    });

  };
})