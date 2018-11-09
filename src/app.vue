<template>
  <app-view id="app">
    <app-header></app-header>
    <app-view container>
      <app-panel shadow>
        <app-panel padding primary>
          <template slot="header">
            Check the payload
          </template>
          <div class="text-div-top">
          <h1>Payload</h1>
          <p>
            Your migration data is stored in a payload, which
            functions as a receipt. <br/> Enter yours below, to
            confirm that the information contained in the <br/> payload is correct.
          </p>
          <app-url v-model="payload">
            <ae-toolbar fill="neutral">
              a
            </ae-toolbar>
          </app-url>
          </div>
        </app-panel>
        <app-panel padding primary>
          <div class="text-div-bottom">
          <h1>Payload Information</h1>
          <p>
            The payload above contains the following information.<br/>
            Please check if the information below is correct.
          </p>
        </div>
        <div class="status-table-div">
          <ul class="app-status-table">
            <li>
              <h3>Amount to be migrated</h3>
              <div class="app-status-payload">
                <span v-if="+tokenAmount">
                  <big>{{tokenAmount}}</big><small>AE</small>
                </span>
                <span v-else-if="!+tokenAmount && payload">
                  <div><ae-icon name="x-square" style="color:red" size="28px"/></div>
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
                  <div><ae-icon name="check" style="color:green" size="28px"/></div>
                </span>
                <span v-else-if="!callFunction && payload">
                  <div><ae-icon name="x-square" style="color:red" size="28px"/></div>
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
                  <div><ae-icon name="check" style="color:green" size="28px"/></div>
                </span>
                <span v-else-if="!burnContract && payload">
                  <div><ae-icon name="x-square" style="color:red" size="28px"/></div>
                </span>
                <span v-else>
                  <p>no data</p>
                </span>
              </div>
            </li>
            <li>
              <h3>Your AE Mainnet Address</h3>
              <span v-if="aeAddress && payload">
                <div><ae-icon name="check" style="color:green" size="28px"/></div>
              </span>
              <span v-else-if="!aeAddress && payload">
                <div><ae-icon name="x-square" style="color:red" size="28px"/></div>
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
import AeToolbar from '@aeternity/aepp-components/dist/ae-toolbar'
import AeIcon from '@aeternity/aepp-components/dist/ae-icon'
import AppUrl from './components/app-url.vue'

const $web3 = new Web3()

export default {
  name: 'index',
  components: {
    AeToolbar,
    AeAddress,
    AeIcon,
    AppUrl
  },
  data: function () {
    return { payload: '' }
  },
  computed: {
    tokenAmount: function () {
      if (this.payload && typeof this.payload !== 'string') {
        return false
      }

      try {
        return $web3.utils.fromWei(
          $web3.utils.toBN('0x' + this.payload.substr(72, 64)
          ).toString()
        )
      } catch (e) {
        return false
      }
    },
    callFunction: function () {
      if (this.payload && typeof this.payload !== 'string') {
        return false
      }
      return this.payload.substr(0, 8) === process.env.VUE_APP_AE_CALL_FUNCTION
    },
    burnContract: function () {
      if (this.payload && typeof this.payload !== 'string') {
        return false
      }
      return this.payload.substr(8, 64) === process.env.VUE_APP_AE_BURN_CONTRACT
    },
    aeAddress: function () {
      if (this.payload && typeof this.payload !== 'string') {
        return false
      }

      try {
        return $web3.utils.hexToString(
          $web3.eth.abi.decodeParameter('bytes', this.payload.substr(136))
        )
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
