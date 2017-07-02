export default {
    soda: {
        label: 'Sodavand',
        price: 5,
    },
    beer: {
        label: 'Øl',
        price: 5,
    },
    get: function(item) {
        switch (item) {
            case 'soda':
                return this.soda;
            case 'beer':
                return this.beer;
        }

        return undefined;
    },
};