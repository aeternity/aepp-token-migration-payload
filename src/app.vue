<template>
  <app-view id="app">
    <app-header></app-header>
    <app-view container>
      <app-panel shadow>
        <template slot="header">
          Check the payload
        </template>
        <app-panel padding primary>
          <h1>Payload</h1>
          <p>
            Your migration data is stored in a payload, which
            functions as a receipt. Enter yours below, to
            confirm that the information contained in the payload is correct.
          </p>
          <app-url v-model="payload">
            <ae-toolbar fill="neutral">
              a
            </ae-toolbar>
          </app-url>
        </app-panel>
        <app-panel padding primary>
          <h1>Payload Information</h1>
          <p>
            The payload above contains the following information.
            Please check if the information below is correct.
          </p>

          <ul class="app-status-table">
            <li>
              <h5>Token Call Function</h5>
              <div class="app-status-payload">
                <a href="#" target="_blank">
                  <p>something</p>
                </a>
                <h1>
                  {{callFunction}}
                </h1>
              </div>
            </li>
            <li>
              <h5>AE Migration Contract</h5>
              <div class="app-status-payload">
                <a href="#" target="_blank">
                  <p>something</p>
                </a>
                <h1>
                  {{burnContract}}
                </h1>
              </div>
            </li>
            <li>
              <h5>AE Mainnet Address</h5>
              <div class="app-status-payload">
                <a href="#" target="_blank">
                  <p>something</p>
                </a>
                <h1>
                  {{aeAddress}}
                </h1>
              </div>
            </li>
            <li>
              <h5>Amount to be migrated</h5>
              <div class="app-status-payload">
                <p></p>
                <h1 v-if="tokenAmount">
                  {{tokenAmount}}<small>AE</small>
                </h1>
                <h1 v-else>
                  0<small>AE</small>
                </h1>
              </div>
            </li>
          </ul>
        </app-panel>
      </app-panel>
    </app-view>
  </app-view>
</template>
<script>
import Web3 from 'web3'
import AeToolbar from '@aeternity/aepp-components/dist/ae-toolbar'
import AppUrl from './components/app-url.vue'

const $web3 = new Web3()

export default {
  name: 'index',
  components: {
    AeToolbar,
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
.app-status-table {
  padding: 0;
  margin: 0;

  > li {
    border-bottom: 1px solid #D3DCE6;
    list-style: none;
    padding: 2rem 0;

    &:last-child {
      border-bottom: 0;
    }

    > h5 {
      margin: 0;
    }
  }
}

.app-status-payload {
  display: flex;
  justify-content: space-between;
  align-items: center;

  > h1 {
    margin: 0;
    font-weight: normal;

    > small {
      font-size: 50%;
    }
  }

  > a > p {
    @extend %face-tracked-base;

    color: #76818C;
    font-size: rem(15px);
    margin: 0;
    width: 550px;

    /deep/ > span {
      display: inline-block;
      margin-right: 1rem;
    }
  }

  > a:hover > p {
    color: $color-red;
  }
}

</style>
