import {Box, Flex} from 'grid-emotion';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'react-emotion';

import {t, tct} from '../../../locale';
import AsyncView from '../../asyncView';
import Button from '../../../components/buttons/button';
import {Panel, PanelBody, PanelHeader, PanelItem} from '../../../components/panels';
import recreateRoute from '../../../utils/recreateRoute';
import ReportUri from './reportUri';
import PreviewFeature from '../../../components/previewFeature';
import SettingsPageHeader from '../components/settingsPageHeader';
import TextBlock from '../components/text/textBlock';

const HeaderName = styled.span`
  font-size: 1.2em;
`;

export default class ProjectSecurityHeaders extends AsyncView {
  static propTypes = {
    setProjectNavSection: PropTypes.func,
  };

  componentWillMount() {
    super.componentWillMount();
    this.props.setProjectNavSection('settings');
  }

  getEndpoints() {
    let {orgId, projectId} = this.props.params;
    return [['keyList', `/projects/${orgId}/${projectId}/keys/`]];
  }

  getReports() {
    return [
      {
        name: 'Content Security Policy (CSP)',
        url: recreateRoute('csp/', this.props),
      },
      {
        name: 'Certificate Transparency (Expect-CT)',
        url: recreateRoute('expect-ct/', this.props),
      },
    ];
  }

  renderBody() {
    return (
      <div>
        <SettingsPageHeader title={t('Security Header Reports')} />

        <PreviewFeature />

        <ReportUri keyList={this.state.keyList} params={this.props.params} />

        <Panel>
          <PanelHeader>{t('Additional Configuration')}</PanelHeader>
          <PanelBody disablePadding={false}>
            <TextBlock style={{marginBottom: 20}}>
              {tct(
                'In addition to the [key_param] parameter, you may also pass the following within the querystring for the report URI:',
                {
                  key_param: <code>sentry_key</code>,
                }
              )}
            </TextBlock>
            <table className="table" style={{marginBottom: 0}}>
              <tr>
                <th style={{padding: '8px 5px'}}>sentry_environment</th>
                <td style={{padding: '8px 5px'}}>
                  {t('The environment name (e.g. production)')}.
                </td>
              </tr>
              <tr>
                <th style={{padding: '8px 5px'}}>sentry_release</th>
                <td style={{padding: '8px 5px'}}>
                  {t('The version of the application.')}
                </td>
              </tr>
            </table>
          </PanelBody>
        </Panel>

        <Panel>
          <PanelHeader>{t('Supported Formats')}</PanelHeader>
          <PanelBody>
            {this.getReports().map(({name, description, url}) => (
              <PanelItem key={url} p={0} direction="column">
                <Flex flex="1" p={2} align="center">
                  <Box flex="1">
                    <HeaderName>{name}</HeaderName>
                  </Box>
                  <Button to={url} priority="primary">
                    {t('Instructions')}
                  </Button>
                </Flex>
              </PanelItem>
            ))}
          </PanelBody>
        </Panel>
      </div>
    );
  }
}
