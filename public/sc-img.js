const template = document.createElement('template');
template.innerHTML = `
    <style>
        :host {
            display: block;
        }
        img {
            width: 100%;
        }
    </style>
`;

const io = new IntersectionObserver(entries => {
    for(const entry of entries) {
        if (entry.isIntersecting) {
            entry.target.setAttribute('full', '');
        }
    }
});

class SCImg extends HTMLElement {

    static get observedAttributes() {
        return ['full'];
    }
    constructor (){
        super();
        this.attachShadow({mode: 'open' });
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }

    connectedCallback() {
        io.observe(this);
    }

    disconnectedCallback() {
        io.unobserve(this);
    }

    // get loaded() {
    //     console.log('loaded');
        
    //     return this.getAttribute('loaded');
    // }

    // set loaded(val) {
    //     this.setAttribute('full', true);
    // }

    get full() {
        return this.hasAttribute('full');
    }

    get src() {
        //console.log('src');
        
        return this.getAttribute('src');
    }

    attributeChangedCallback() {
        if (this.loaded) {
            return;
        }
        const img = document.createElement('img');
        img.src = this.src;
        img.onload = _=> {
            //console.log('poop');
            
            this.loaded = true;
            this.shadowRoot.appendChild(img);
        }
    }
}

customElements.define('sc-img', SCImg);