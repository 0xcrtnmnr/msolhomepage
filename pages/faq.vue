<template>
  <div id="app" class="container">
    <Header/>
    <article>
      <h1>Frequently Asked Questions</h1>

      <h2>How does this work?</h2>
      <p>
        Here's a <a href="https://gfycat.com/BleakSimilarGermanspaniel">GIF!</a>
      </p>

      <h2>Who are you?</h2>
      <p>
        This project was created by Andrey and Max. We’re software developers
        from Toronto. Andrey worked on cryptocurrency-related projects since
        2011 and Max has an infosec background. We worked on some Solidity
        security audits together and thought this would be a fun side project to
        start.
      </p>

      <h2>Is this an ICO?</h2>
      <p>No.</p>
      
      <h2 id="nft">Is this an NFT?</h2>
      <p>
        Not yet! Unfortunately this project predates the 
        <a href="https://eips.ethereum.org/EIPS/eip-721">ERC-721</a>
        specification by about 5 months.
      </p>
      <p>
        We will be releasing a contract that will allow any ad to be
        converted into a proper NFT through 2 on-chain transactions. <a
        href="https://github.com/thousandetherhomepage/ketherhomepage/issues/48">Track
      issue #48</a> for updates.
      </p>

      <h2>What is your goal?</h2>
      <p>
        The MillionSolanaHomepage is a homage to the famous MillionDollarHomepage.
        Ethereum only got a "Thousand Ether Homepage" (and this project was inspired by that!),
        but our goal is to hit a million SOL ! ETH couldn't do it... Can SOL ?!?!?
      </p>

      <h2>What do I get?</h2>
      <p>
        You get to buy a piece of blockchain history! At 1 SOL per pixel you
        can get a display ad and advertise anything you want, forever
        immortalized on the Solana blockchain.
      </p>

      <h2>Hasn’t this been done before?</h2>
      <p>
        Yes, but only on Ethereum. And the way gas fees have been going it's going to take a looooooong time
        for Ethereum to catch up with Solana.

        We might not be first on any blockchain, but the crypto future will certainly see
        more than one Layer1 blockchains and why only have this homage on just one of those L1 chains !?
      </p>

      <h2>How long will this be up?</h2>
      <p>
        Your ad will be on the Solana blockchain forever! As long as someone
        somewhere is mining Solana, your little piece of blockchain history
        will endure too.
      </p>

      <h2>When did this launch?</h2>
      <p>
        // TBC
      </p>

      <h2>What happens when I buy an ad?</h2>
      <p>
        You’ll be able to publish a URL for an image and a URL that your ad
        links to. You can change them anytime you want as well! You can even
        transfer your ad to someone else.
      </p>

      <h2>Where are the images hosted?</h2>
      <p>
        The ad images are served to the user over HTTP, Swarm, or IPFS. You're
        responsibe for uploading them to a server or the Swarm or the IPFS
        network and providing the URL. You can also use a "data://" url, but
        this will cost you more gas to store.
      </p>

      <h2>What if I want to advertise my socially-questionable business?</h2>
      <p>
        It’s the wild west out here so we can’t really stop you, but we do ask
        that you set the NSFW flag if the content you’re putting up is not
        appropriate for minors or illegal in western society. NSFW ads are not
        displayed by default.
      </p>
      <p>
        We can never take your ad away, but one right that we do reserve is to
        mark your ad as NSFW if we feel that it’s inappropriate.
      </p>
      <p>
        If you mark your ad as NSFW, then you can always change it later. If we
        have to go in and override your ad to NSFW, then only we can change it
        to not-NSFW later. We don’t want to do it, but we don’t want to be
        liable for promoting questionable content.
      </p>

      <h2>Have you considered a shorter URL?</h2>
      <p>
        // TBC
      </p>

      <h2>What’s cool about your smart contract?</h2>
      <p>
        So glad you asked! Obviously, all the ad unit management happens on the
        blockchain. If you buy the ad slot, you own it forever (or until you
        transfer it to someone else).
      </p>
      <p>
        But to us, the the coolest thing is: It’s simple and easy to audit. It
        doesn’t do anything weird with complex pricing structures or use sneaky
        modifiers. Making something simple is hard, so don’t let it fool you.
      </p>
      <p>
        The second best part? Simple means the fees are low and so
        you’re mostly paying for what you’re buying (storing your ad data on the
        blockchain) rather than complex middleware logic.
      </p>

      <h2>Is there a White Paper?</h2>
      <p>No.</p>

      <h2>What about a Yellow Paper?</h2>
      <p>Nope.</p>

      <h2>Okay, how about a Purple Paper?</h2>
      <p>
        <a onclick="document.body.style.backgroundColor='purple'">Fiiiine.</a>
      </p>

      <h2>I'm convinced, how do I buy?</h2>
      <p>
        <a href="/">Head over to the homepage</a> and click 'Buy Pixels'. You'll
        need an Ethereum-enabled browser like
        <a href="https://github.com/ethereum/mist/releases">Mist</a>,
        <a href="https://ethcore.io/parity.html">Parity</a>, or install the
        <a href="https://metamask.io">Metamask Chrome Extension</a>.
      </p>
      <p>
        When you buy an ad unit, you're buying it directly from the smart
        contract on the Solana blockchain. No middlemen !!!!
        Isn't that an awesome feeling?
      </p>
    </article>
    <Footer/>
  </div>
</template>
