<template>
  <app-view id="app">
    <app-header></app-header>
    <app-view container>
      <app-panel shadow>
        <app-panel padding primary>
          <template slot="header">
            View the dataload
          </template>
          <div class="text-div-top">
            <h1>Dataload</h1>
            <p>
              The transaction data of the migration is stored in a dataload. <br />
              Enter your dataload (if you saved it during transaction) to view <br />
              the details of your transaction.
            </p>
            <app-url v-model="payload"/>
          </div>
        </app-panel>
        <app-panel padding primary>
          <div class="text-div-bottom">
            <h1>Dataload Information</h1>
            <p>
              The dataload above contains the following information.<br/>
              Please check if the information below is correct.
            </p>
          </div>
          <div class="status-table-div">
            <ul class="app-status-table">
              <li>
                <h3>Amount to be migrated</h3>
                <div class="app-status-payload">
                  <span v-if="+tokenAmount">
                    <big>{{tokenAmount}}</big>
                    <small>AE</small>
                  </span>
                  <span v-else-if="!+tokenAmount && payload">
                    <div>
                      <ae-icon name="x-square" style="color:red" size="28px"/>
                    </div>
                  </span>
                  <span v-else>
                    <p>no data</p>
                  </span>
                </div>
              </li>
              <li>
                <h3>Token Call Function</h3>
                <div class="app-status-payload">
                  <span v-if="callFunction && payload">
                    <div>
                      <ae-icon name="check" style="color:green" size="28px"/>
                    </div>
                  </span>
                  <span v-else-if="!callFunction && payload">
                    <div>
                      <ae-icon name="x-square" style="color:red" size="28px"/>
                    </div>
                  </span>
                  <span v-else>
                    <p>no data</p>
                  </span>
                </div>
              </li>
              <li>
                <h3>AE Migration Contract</h3>
                <div class="app-status-payload">
                  <span v-if="burnContract && payload">
                    <div>
                      <ae-icon name="check" style="color:green" size="28px"/>
                    </div>
                  </span>
                  <span v-else-if="!burnContract && payload">
                    <div>
                      <ae-icon name="x-square" style="color:red" size="28px"/>
                    </div>
                  </span>
                  <span v-else>
                    <p>no data</p>
                  </span>
                </div>
              </li>
              <li>
                <h3>Your AE Mainnet Address</h3>
                <span v-if="aeAddress && payload">
                  <div>
                    <ae-icon name="check" style="color:green" size="28px"/>
                  </div>
                </span>
                <span v-else-if="!aeAddress && payload">
                  <div>
                    <ae-icon name="x-square" style="color:red" size="28px"/>
                  </div>
                </span>
                <span v-else>
                  <p>no data</p>
                </span>
              </li>
              <li class="app-align" v-if="aeAddress && payload">
                <ae-address :value="aeAddress" length="flat"/>
              </li>
            </ul>
          </div>
        </app-panel>
      </app-panel>
    </app-view>
  </app-view>
</template>
<script>
import Web3 from 'web3'
import AeAddress from '@aeternity/aepp-components/dist/ae-address'
import AeIcon from '@aeternity/aepp-components/dist/ae-icon'
import AppUrl from './components/app-url.vue'
import bs58check from 'bs58check'

const $web3 = new Web3()

export default {
  name: 'index',
  components: {
    AppUrl,
    AeAddress,
    AeIcon
  },
  data: function () {
    return { payload: '' }
  },
  computed: {
    computedPayload: function () {
      if (this.payload && typeof this.payload !== 'string') {
        return false
      }
      if (this.payload.substring(0, 2) === '0x') {
        return this.payload.substring(2)
      }
      return this.payload
    },
    tokenAmount: function () {
      try {
        return $web3.utils.fromWei(
          $web3.utils.toBN('0x' + this.computedPayload.substr(72, 64)
          ).toString()
        )
      } catch (e) {
        return false
      }
    },
    callFunction: function () {
      return this.computedPayload.substr(0, 8) === process.env.VUE_APP_AE_CALL_FUNCTION
    },
    burnContract: function () {
      return this.computedPayload.substr(8, 64) === process.env.VUE_APP_AE_BURN_CONTRACT
    },
    aeAddress: function () {
      try {
        let addr = $web3.utils.hexToString(
          $web3.eth.abi.decodeParameter('bytes', this.computedPayload.substr(136))
        )
        let match = addr.match(/^ak_([123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz]*)$/)
        if(!match) {
          throw new Error("malformed aeternity address")
        }
        bs58check.decode(match[1])
        return addr
      } catch (e) {
        return false
      }
    }
  }
}
</script>
<style lang="scss">
.text-div-top {
  text-align: center;
  padding: 45px 45px 50px 45px;
}

.text-div-bottom {
  text-align: center;
  padding: 30px 45px 25px 45px;
  border-top: 1px solid #D3DCE6;
}

.status-table-div {
  padding: 0px 100px 120px 100px;
}

.app-align /deep/ ul {
  justify-items: left !important;
}

.app-status-table {
  padding: 0;
  margin: 0;

  > li {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #D3DCE6;
    list-style: none;
    padding: 1rem 0;

    &:last-child {
      border-bottom: 0;
    }

    > h5 {
      margin: 0;
    }
  }
}
</style>
