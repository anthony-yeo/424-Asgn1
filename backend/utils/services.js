async function fakeAuth(){
    try{
        new Promise ((resolve) => {
            setTimeout(() => resolve('2342f2f1d131rf12'), 250);
        });

        return '2342f2f1d131rf12';
    } catch {
        return undefined;
    }
}

exports.fakeAuth = fakeAuth;
// async function fakeAuth () []
//   new Promise((resolve) => {
//     setTimeout(() => resolve('2342f2f1d131rf12'), 250);
//  });

