import React from 'react';
import styled from 'styled-components';
import { AlertCircle, LayoutDashboard, Database, Share2, MousePointer2, Server, Moon, ShieldCheck, Zap } from 'lucide-react';

const Container = styled.div`
  padding: 32px;
  max-width: 1000px;
  margin: 0 auto;
`;

const PageHeader = styled.div`
  margin-bottom: 32px;
  
  h1 {
    font-size: 32px;
    font-weight: 800;
    color: ${({ theme }) => theme.colors.text};
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 8px;
  }
  
  p {
    font-size: 16px;
    color: ${({ theme }) => theme.colors.textSecondary};
    line-height: 1.6;
  }
`;

const Section = styled.section`
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 16px;
  padding: 32px;
  margin-bottom: 24px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -2px rgba(0, 0, 0, 0.05);
`;

const SectionTitle = styled.h2`
  font-size: 20px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primary};
  margin-top: 0;
  margin-bottom: 24px;
  display: flex;
  align-items: center;
  gap: 12px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  padding-bottom: 16px;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const FeatureCard = styled.div`
  background: ${({ theme }) => theme.colors.backgroundAlt};
  padding: 24px;
  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  
  h3 {
    margin-top: 0;
    font-size: 16px;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.text};
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 12px;
  }
  
  p {
    margin: 0;
    font-size: 14px;
    line-height: 1.6;
    color: ${({ theme }) => theme.colors.textSecondary};
  }
  
  ul {
    margin: 12px 0 0 0;
    padding-left: 20px;
    font-size: 14px;
    color: ${({ theme }) => theme.colors.textSecondary};
    
    li {
      margin-bottom: 6px;
    }
  }
`;

const TechSection = styled.div`
  background: linear-gradient(135deg, #0f172a 0%, #1e3a8a 100%);
  border-radius: 16px;
  padding: 32px;
  color: white;
  margin-top: 40px;
  box-shadow: 0 10px 25px -5px rgba(29, 78, 216, 0.4);
  position: relative;
  overflow: hidden;

  h2 {
    color: white;
    font-size: 24px;
    margin-top: 0;
    margin-bottom: 16px;
    display: flex;
    align-items: center;
    gap: 12px;
    position: relative;
    z-index: 2;
  }

  p {
    font-size: 16px;
    line-height: 1.7;
    color: #e2e8f0;
    margin: 0;
    position: relative;
    z-index: 2;
  }

  /* Decorative element */
  &::after {
    content: '';
    position: absolute;
    top: -50%;
    right: -10%;
    width: 300px;
    height: 300px;
    background: radial-gradient(circle, rgba(59, 130, 246, 0.4) 0%, transparent 70%);
    border-radius: 50%;
    z-index: 1;
  }
`;

const Highlight = styled.span`
  background-color: ${({ theme }) => theme.colors.primaryLight};
  color: ${({ theme }) => theme.colors.primary};
  padding: 2px 6px;
  border-radius: 4px;
  font-weight: 600;
  font-size: 12px;
`;

export const LeiaMe: React.FC = () => {
    return (
        <Container>
            <PageHeader>
                <h1><AlertCircle color="#ef4444" size={36} /> Guia da Prova de Conceito (POC)</h1>
                <p>
                    Bem-vindo à demonstração do novo sistema CRM da <strong>Arasol</strong>. Este roteiro foi criado para garantir
                    que você explore as inovações presentes em cada módulo.
                </p>
            </PageHeader>

            <Section>
                <SectionTitle><MousePointer2 size={24} /> O que observar nesta demonstração</SectionTitle>
                <Grid>
                    <FeatureCard>
                        <h3><LayoutDashboard size={18} color="#eab308" /> Dashboards Dinâmicos</h3>
                        <p>
                            Na aba <strong>Home</strong> construímos gráficos centralizados, módulos vai virar fluxo e junto com o controle de acesso você terá controle completo.
                        </p>
                        <ul>
                            <li>Navegue pelas abas <Highlight>Propostas</Highlight> e <Highlight>Leads</Highlight>.</li>
                            <li>Métricas destacadas com chips (pílulas) secundárias focadas em legibilidade.</li>
                        </ul>
                    </FeatureCard>

                    <FeatureCard>
                        <h3><Share2 size={18} color="#10b981" /> Orquestrador de Fluxos</h3>
                        <p>
                            Acesso em <strong>Cadastros {'>'} Fluxos</strong>. Veja como o controle ficará literalmene
                            <em>'em suas mãos'</em>.
                        </p>
                        <ul>
                            <li>Experimente arrastar os blocos pela tela (Visual Drag & Drop).</li>
                            <li>Nós utilizamos o motor do <code>React Flow</code> para desenhar as etapas.</li>
                        </ul>
                    </FeatureCard>

                    <FeatureCard>
                        <h3><Database size={18} color="#3b82f6" /> Cadastro de Usuários</h3>
                        <p>
                            Em <strong>Cadastros {'>'} Usuários</strong>, clique no botão para adicionar um usuário e
                            vá diretamente para a aba <Highlight>Controle de Acesso</Highlight>.
                        </p>
                        <ul>
                            <li>A ideia é mostrar o controle granular que o usuário terá sobre a plataforma.</li>
                        </ul>
                    </FeatureCard>

                    <FeatureCard>
                        <h3><Moon size={18} color="#8b5cf6" /> Dark Mode e Tematização</h3>
                        <p>
                            O ecossistema já nasceu prevendo cenários noturnos e de alto contraste.
                        </p>
                        <ul>
                            <li>Abra o <strong>Menu Lateral Principal</strong> (à esquerda).</li>
                            <li>Clique no ícone de <strong>Sol/Lua</strong> no rodapé do menu e experimente a inversão de cores (Dark Mode).</li>
                        </ul>
                    </FeatureCard>
                </Grid>
            </Section>

            <Section>
                <SectionTitle><Zap size={24} /> Execução de Fluxo em "Propostas"</SectionTitle>
                <p style={{ marginTop: 0, marginBottom: 24, lineHeight: 1.6, color: '#475569' }}>
                    Na tela de <strong>Propostas</strong> unificamos a listagem com o executor da tarefa ("Runner").
                    Ao invés de ir para uma tela preta e sem graça, o sistema cria o layout com base na etapa do fluxo.
                </p>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 16 }}>
                    <div style={{ padding: 16, borderLeft: '4px solid #3b82f6', background: '#f8fafc', borderRadius: '0 8px 8px 0' }}>
                        <strong>1. O Gatilho:</strong> Clique em <Highlight>+ Adicionar Opportunity</Highlight> e escolha qual pipeline iniciar (por exemplo, <em>Fluxo: Leads</em>).
                    </div>
                    <div style={{ padding: 16, borderLeft: '4px solid #10b981', background: '#f8fafc', borderRadius: '0 8px 8px 0' }}>
                        <strong>2. Formulários Customizados:</strong> A etapa 1 ("Cadastro") e a etapa 3 ("Qualificação") carregam interfaces exclusivas no centro da tela. Experimente qualificar ou desqualificar o lead para ver a lógica dos botões inferiores mudando.
                    </div>
                    <div style={{ padding: 16, borderLeft: '4px solid #eab308', background: '#f8fafc', borderRadius: '0 8px 8px 0' }}>
                        <strong>3. Interface Padrão do Backlog:</strong> Se escolher iniciar um fluxo de <em>Engenharia</em>, verá um layout padrão em blocos onde a equipe fará upload de arquivos e anotações rotineiras.
                    </div>
                </div>
            </Section>

            <TechSection>
                <h2><Server size={28} /> Arquitetura e Engenharia Backend</h2>
                <p>
                    Além da melhora significativa e do impacto do novo conceito visual, o novo sistema da Arasol
                    terá uma estrutura muito melhor e profunda <strong>por trás do visual</strong>. Na construção da API e na severa
                    normalização dos dados do banco, garantiremos um ganho gigantesco de performance e resiliência das rotas. <br /><br />

                    <span style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 12, fontWeight: 500 }}>
                        <ShieldCheck size={20} color="#60a5fa" />
                        Além disso, o sistema terá muito mais segurança e total confiabilidade na extração e conciliação de seus dados analíticos.
                    </span>
                </p>
            </TechSection>

        </Container>
    );
};
