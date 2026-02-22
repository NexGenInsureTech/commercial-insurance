
export async function loadConfig(path){
 const res = await fetch(path);
 if(!res.ok) throw new Error("Config load failed");
 return await res.json();
}
