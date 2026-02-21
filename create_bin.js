async function createBin() {
    const req = await fetch('https://crudcrud.com/api/');
    console.log(req.status);
}
createBin();
