/*
 * base58.js
 *  - encodes Uint8Array to base58 Uint8Array
 *  - decodes Uint8Array from base58 Uint8Array
 *
 * Usage:
 *   base58.encode(Uint8Array);
 *   base58.decode(Uint8Array);
 *
 * Examples:
 *   base58.encode(new TextEncoder().encode("Hello"));
 *   new TextDecoder().decode(base58.decode("9Ajdvzr"));
 *
 * (c) 2018 Xia Xiongjun
 */

var base58 = (function() {
    var MAP = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz';

    var to_b58   = function(B,A){var d=[],s="",i,j,c,n;for(i in B){j=0,c=B[i];s+=c||s.length^i?"":1;while(j in d||c){n=d[j];n=n?n*256+c:c;c=n/58|0;d[j]=n%58;j++}}while(j--)s+=A[d[j]];return s};
    var from_b58 = function(S,A){var d=[],b=[],i,j,c,n;for(i in S){j=0,c=A.indexOf(S[i]);if(c<0)return undefined;c||b.length^i?i:b.push(0);while(j in d||c){n=d[j];n=n?n*58+c:c;c=n>>8;d[j]=n%256;j++}}while(j--)b.push(d[j]);return new Uint8Array(b)};

    return {
        encode: function(enc) {
            return to_b58(enc, MAP);
        },
        decode: function(dec) {
            return from_b58(dec, MAP);
        }
    };
})();
