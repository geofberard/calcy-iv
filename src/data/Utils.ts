export const findById: <T extends { id: string }>(
  id: string,
  elements: T[]
) => T = (id, elements) => elements.find(element => element.id === id);

export const getFromPath = <T>(value: any, path: string[]) =>
  value &&
  ((path.length === 0 ? value : getFromPath(value[path[0]], path.slice(1))) as T);

const ACCENT_REPLACEMENT = {
  a: new RegExp("á|à|ã|â|À|Á|Ã|Â", "g"),
  e: new RegExp("é|è|ê|É|È|Ê", "g"),
  i: new RegExp("í|ì|î|Í|Ì|Î", "g"),
  o: new RegExp("ó|ò|ô|õ|Ó|Ò|Ô|Õ", "g"),
  u: new RegExp("ú|ù|û|ü|Ú|Ù|Û|Ü", "g"),
  c: new RegExp("ç|Ç", "g"),
  n: new RegExp("ñ|Ñ", "g"),
};

export const cleanName = (value: string) =>
  value
    .replace(/s$/, "")
    .replace(/s /, " ")
    .replace(/[^a-zA-Z0-9]+/g, "")
    .toLocaleLowerCase();

export const compareClean = (s1: string, s2: string) =>
  cleanName(s1) === cleanName(s2);

export const getDistance = (a:string, b:string) => {
    if(a.length === 0) return b.length; 
    if(b.length === 0) return a.length; 
  
    const matrix = [];
  
    // increment along the first column of each row
    let i;
    for(i = 0; i <= b.length; i++){
      matrix[i] = [i];
    }
  
    // increment each column in the first row
    let j;
    for(j = 0; j <= a.length; j++){
      matrix[0][j] = j;
    }
  
    // Fill in the rest of the matrix
    for(i = 1; i <= b.length; i++){
      for(j = 1; j <= a.length; j++){
        if(b.charAt(i-1) === a.charAt(j-1)){
          matrix[i][j] = matrix[i-1][j-1];
        } else {
          matrix[i][j] = Math.min(matrix[i-1][j-1] + 1, // substitution
                                  Math.min(matrix[i][j-1] + 1, // insertion
                                           matrix[i-1][j] + 1)); // deletion
        }
      }
    }
  
    return matrix[b.length][a.length];
  };