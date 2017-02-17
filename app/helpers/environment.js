const isClient = () => {
  if(typeof window != 'undefined' && window.document){
    return true;
  };
  return false;
}

export { isClient }