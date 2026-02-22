
export async function loadConfig(path){
 const res = await fetch(path);
 return res.json();
}
