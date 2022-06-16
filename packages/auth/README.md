# Soonaverse Auth - Soonaverse Metamask authentication

Library to authenticate Soonaverse with Metamask 

## Getting Started

### NPM Package
Install NPM package
```
npm install @soonaverse/auth --save
```

## SoonAuth
Class used to authenticate with Metamask

### PUBLIC: signWithMetamask

Sign request with Metamask

If user is non existient a new user will be created in Soonaverse

```
const auth = new SoonAuth()
auth.signWithMetamask()
```

### PUBLIC: listenToAccountChange
Listents to metamask account changes

```
const auth = new SoonAuth()
auth.listenToAccountChange((accounts) => {
  console.log(accounts)
  }
)
```

### PUBLIC: stopMetamaskListeners
Stops the metamask account listener

```
const auth = new SoonAuth()

const callback = (accounts) => {
  console.log(accounts)
}

auth.listenToAccountChange(callback)
auth.stopMetamaskListeners(callback)
```

## Contributing

### Contributing Guidelines

Read through our [contributing guidelines](CONTRIBUTING.md) to learn about our submission process, coding rules and more.
