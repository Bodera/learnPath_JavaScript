// an way to catch the rest of the arguments in a function is to use the rest operator (...)
function sum(...args) {
    let total = 0;
    for (let i = 0; i < args.length; i++) {
      total += args[i];
    }
    return total;
}
  
console.log(sum(1, 2, 3, 4, 5, 6, 7, 8, 9, 10));


// neat detail here: Rest parameter must be the last formal parameter
function setPermissionLevel(permissionLevel, ...names) {
    console.log(names)
    
    names.forEach((name)=> console.log(`${name} now has ${permissionLevel} level access.`))
}

setPermissionLevel('admin', 'John', 'Jane', 'Joe')
