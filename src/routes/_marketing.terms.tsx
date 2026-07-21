import { createFileRoute } from "@tanstack/react-router";

import { LegalPage } from "@/components/legal-page";

export const Route = createFileRoute("/_marketing/terms")({
  component: Terms,
});

function Terms() {
  return (
    <LegalPage title="Termos de uso" updatedAt="3 de julho de 2026">
      <h2>1. Aceitação dos termos</h2>
      <p>
        Ao acessar e usar este serviço, você concorda com estes Termos de uso. Se não concordar com
        qualquer parte, não utilize o serviço. Estes termos se aplicam a todos os visitantes,
        usuários e demais pessoas que acessem a plataforma.
      </p>

      <h2>2. Uso da conta</h2>
      <p>
        Você é responsável por manter a confidencialidade das suas credenciais e por todas as
        atividades que ocorram sob a sua conta. Notifique-nos imediatamente sobre qualquer uso não
        autorizado.
      </p>
      <ul>
        <li>Forneça informações precisas e mantenha-as atualizadas.</li>
        <li>Não compartilhe suas credenciais com terceiros.</li>
        <li>Não utilize o serviço para fins ilícitos ou não autorizados.</li>
      </ul>

      <h2>3. Propriedade intelectual</h2>
      <p>
        O serviço e seu conteúdo original, recursos e funcionalidades são e permanecerão de
        propriedade exclusiva da adila.co e de seus licenciadores. A marca não pode ser usada sem
        autorização prévia por escrito.
      </p>

      <h2>4. Limitação de responsabilidade</h2>
      <p>
        O serviço é fornecido “no estado em que se encontra”, sem garantias de qualquer natureza. Na
        máxima extensão permitida pela lei, a adila.co não se responsabiliza por danos indiretos,
        incidentais ou consequenciais decorrentes do uso do serviço.
      </p>

      <h2>5. Alterações</h2>
      <p>
        Podemos revisar estes termos a qualquer momento. Ao continuar acessando o serviço após as
        alterações, você concorda com os termos revisados. Recomendamos revisar esta página
        periodicamente.
      </p>

      <h2>6. Contato</h2>
      <p>
        Dúvidas sobre estes termos podem ser enviadas para{" "}
        <a href="mailto:legal@adila.co">legal@adila.co</a>.
      </p>
    </LegalPage>
  );
}
