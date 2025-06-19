/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots['SclBayTemplate Plugin looks like the latest snapshot'] = `<main>
  <div class="btn-group">
    <mwc-icon-button
      icon="info"
      title="Show LibDoc info"
    >
    </mwc-icon-button>
  </div>
  <div class="columns">
    <div style="margin:10px;width:600px">
      <div>
        <span title="Resize SLD">
          <mwc-icon-button style="--mdc-icon-button-size:48px;">
          </mwc-icon-button>
        </span>
      </div>
      <compas-sld-viewer-9f3b7c1d>
      </compas-sld-viewer-9f3b7c1d>
    </div>
    <div style="width:100%;overflow-y:scroll;">
      <div style="flex:auto;display:flex; height:100%">
        <div class="allfunc container">
          TEMPLATE
          <nav>
            <span title="Import from Function Specification">
              <mwc-icon-button
                disabled=""
                icon="copy_all"
              >
              </mwc-icon-button>
            </span>
            <input
              accept=".fsd,"
              id="funcinput"
              style="display:none;"
              type="file"
            >
            <span title="Create New Function/EqFunction">
              <mwc-icon-button
                disabled=""
                icon="functions"
              >
              </mwc-icon-button>
            </span>
          </nav>
          <div class="container func">
            <mwc-icon-button
              icon="functions"
              style="pointer-events: none;"
            >
            </mwc-icon-button>
            ETH
          </div>
          <div class="container func">
            <mwc-icon-button
              icon="functions"
              style="pointer-events: none;"
            >
            </mwc-icon-button>
            CTR
          </div>
          <div class="container func unmapped">
            <mwc-icon-button
              icon="functions"
              style="pointer-events: none;"
            >
            </mwc-icon-button>
            CBR
          </div>
          <div class="container func unmapped">
            <mwc-icon-button
              icon="functions"
              style="pointer-events: none;"
            >
            </mwc-icon-button>
            CBR
          </div>
          <div class="container func">
            <mwc-icon-button
              icon="functions"
              style="pointer-events: none;"
            >
            </mwc-icon-button>
            DIS
          </div>
          <div class="container func">
            <mwc-icon-button
              icon="functions"
              style="pointer-events: none;"
            >
            </mwc-icon-button>
            DIS
          </div>
          <div class="container func unmapped">
            <mwc-icon-button
              icon="functions"
              style="pointer-events: none;"
            >
            </mwc-icon-button>
            P81U
          </div>
          <div class="container func">
            <mwc-icon-button
              icon="functions"
              style="pointer-events: none;"
            >
            </mwc-icon-button>
            P51N
          </div>
          <div class="container func">
            <mwc-icon-button
              icon="functions"
              style="pointer-events: none;"
            >
            </mwc-icon-button>
            P51
          </div>
          <div class="container func unmapped">
            <mwc-icon-button
              icon="functions"
              style="pointer-events: none;"
            >
            </mwc-icon-button>
            Meas
          </div>
        </div>
        <compas-function-editor-a1b2c3d4
          editcount="-1"
          style="flex:auto;"
        >
        </compas-function-editor-a1b2c3d4>
      </div>
    </div>
    <div>
    </div>
  </div>
</main>
<mwc-dialog
  heading="SLD pane width"
  id="sldWidthDialog"
>
  <mwc-textfield
    type="number"
    value="600"
  >
  </mwc-textfield>
  <mwc-button
    icon="save"
    label="Save"
    slot="primaryAction"
  >
  </mwc-button>
</mwc-dialog>
<mwc-dialog
  heading="LNodeType Library Info"
  id="lnode-lib-info"
>
  <div>
    <div>
      <b>
        File name:
      </b>
      No LNodeType Library loaded
    </div>
    <div>
      <b>
        Version:
      </b>
    </div>
    <div>
      <b>
        Last update:
      </b>
    </div>
  </div>
  <mwc-button
    dialogaction="close"
    slot="primaryAction"
  >
    Close
  </mwc-button>
</mwc-dialog>
`;
/* end snapshot SclBayTemplate Plugin looks like the latest snapshot */
