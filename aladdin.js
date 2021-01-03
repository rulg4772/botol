const fetch = require('node-fetch');
const cheerio = require('cheerio');
var randomize = require('randomatic');
const readline = require("readline-sync");
var random = require('random-name');
const { link } = require('fs-extra');

const functionRegist = (email, reff) => new Promise((resolve, reject) => {
    const params = new URLSearchParams;
    params.append('fingerprint', '582742413');
    params.append('email', email);
    params.append('pwd', 'Berak321#');
    params.append('repwd', 'Berak321#');
    params.append('inviteCode', reff);
    params.append('login_term', 'on');
    params.append('login_agree', 'on');
    params.append('g-recaptcha-response', '03AGdBq27Kf7KZxgtaDrYUDrKLy3I6YX3pd-TKmTQWZKB68UuCitmb1XmxKZn8YICkR_xxuxmvZ14bsti5B15gm4w-_oHVfnk5tYAYIefGXaUFf_FP_VvhjtMeQomsZQdfgUgCADDZapCBfRW4Ni93CdZC26kcC3bkJi0S-rNfvyKLIBDRTwf-vYcCQWIvDijtUQGQ_KUqPckJF2rPv3ddPrY482n783SIMzunhxzwjfWHg0Dcix3sa1mEgLeoh7IsYiP_xS2MIoA-1jTdvkpQDPJ41RBvHu9r9SsrQwpIX18xetxRi9HtwHLGylc4n5fyYlO4pARWFOcBFCL7jaRjMx1GgBT1b-cx9aKl6jb8V21Hce8aVrmdyzkxBusslXqqZlEY5Id_uuSCJF_uYZPqwxmYrqb_t9C-Kn6LZV-fFWa-t4RAwXS7jwcBUBi9KpnMSEG2BV7ssMB39PzQXP0-5w_tgDkHcxctlA');

    fetch(`https://aladdin25.com/user/doRegist`, { 
        method: 'POST', 
        body: params,
        headers: {
            'Host': 'aladdin25.com',
            'Connection': 'keep-alive',
            'Origin': 'https://aladdin25.com',
            'Content-Type': 'application/x-www-form-urlencoded',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.88 Safari/537.36',
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
            'Sec-Fetch-Site': 'same-origin',
            'Sec-Fetch-Mode': 'navigate',
            'Sec-Fetch-User': '?1',
            'Sec-Fetch-Dest': 'document',
            'Referer': `https://aladdin25.com/user/join?referral=${reff}`,
            'Accept-Encoding': 'gzip, deflate, br',
            'Accept-Language': 'id-ID,id;q=0.9,en-US;q=0.8,en;q=0.7'
        }
    })
    .then(res => res.text())
    .then(result => {
        resolve(result);
    })
    .catch(err => reject(err))
});

const functionGetLink = (nickname) =>
   new Promise((resolve, reject) => {
       fetch(`https://generator.email/`, {
           method: "get",
           headers: {
               'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
               'accept-encoding': 'gzip, deflate, br',
               'accept-language': 'en-US,en;q=0.9',
               'cookie': `_ga=GA1.2.1434039633.1579610017; _gid=GA1.2.374838364.1579610017; _gat=1; surl=freeallapp.com%2F${nickname}`,
               'sec-fetch-mode': 'navigate',
               'sec-fetch-site': 'same-origin',
               'upgrade-insecure-requests': 1,
               'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.117 Safari/537.36'
           }
       })
       .then(res => res.text())
       .then(result => {
           resolve(result);
       })
       .catch(err => reject(err))
});

const functionVerif = (link) => new Promise((resolve, reject) => {
    fetch(link, { 
        method: 'GET',
    })
    .then(res => res.text())
    .then(result => {
        resolve(result);
    })
    .catch(err => reject(err))
});


(async () => {
    const reff = readline.question('[?] Reff: ')
    const jum = readline.question('[?] Jumlah reff: ')
    console.log("")
    for (var i = 0 ; i < jum; i++){
    try {
        var name = random.first()
        var rand  = randomize('0', 5)
        const email = `${name}${rand}@freeallapp.com`
        console.log(`[+] Email => ${email}`)
        const regist = await functionRegist(email, reff)
        if(regist){
            console.log('[+] Regist Sukses !')
            const getLink = await functionGetLink(`${name}${rand}`)
            if(getLink){
                const hashA = getLink.split('hash=')[1]
                const hash = hashA.split('&')[0]
                const codeA = getLink.split('code=')[1]
                const code = codeA.split(`"`)[0]
                const link = `https://aladdin25.com/emailConfirm?hash=${hash}&code=${code}`
                console.log(`[+] Link => ${link}`)
                const verif = await functionVerif(link)
                if (verif){
                    console.log('[+] Verif Sukses !\n')
                } else {
                    console.log('[!] Verif Gagal !\n')
                }
            } else {
                console.log('[!] Gagal Mendapatkan Link !\n')
            }
        } else {
            console.log('[!] Gagal Regist !')
        }
    } catch (e) {
        console.log(e);
   }
}
})()