import { createFileRoute } from "@tanstack/react-router";

import { LegalPage } from "@/components/legal-page";

export const Route = createFileRoute("/_marketing/privacy")({
  component: Privacy,
});

function Privacy() {
  return (
    <LegalPage title="Política de privacidade" updatedAt="3 de julho de 2026">
      <h2>1. Dados que coletamos</h2>
      <p>
        Coletamos informações que você nos fornece diretamente ao criar uma conta, como nome e
        e-mail, além de dados de uso gerados automaticamente durante a navegação, como endereço IP e
        tipo de dispositivo.
      </p>

      <h2>2. Como usamos os dados</h2>
      <ul>
        <li>Operar, manter e melhorar o serviço.</li>
        <li>Autenticar o acesso e proteger a sua conta.</li>
        <li>Comunicar novidades, alertas de segurança e suporte.</li>
      </ul>

      <h2>3. Compartilhamento</h2>
      <p>
        Não vendemos seus dados pessoais. Compartilhamos informações apenas com prestadores de
        serviço necessários à operação, sempre sob obrigações de confidencialidade, ou quando
        exigido por lei.
      </p>

      <h2>4. Seus direitos</h2>
      <p>
        Nos termos da LGPD, você pode solicitar acesso, correção, portabilidade ou exclusão dos seus
        dados, bem como revogar consentimentos. Para exercer esses direitos, entre em contato
        conosco.
      </p>

      <h2>5. Segurança</h2>
      <p>
        Adotamos medidas técnicas e organizacionais para proteger os dados contra acesso não
        autorizado, perda ou alteração. Nenhum método de transmissão pela internet é 100% seguro,
        mas trabalhamos continuamente para reforçar a proteção.
      </p>

      <h2>6. Contato do encarregado</h2>
      <p>
        Para questões sobre privacidade e proteção de dados, fale com nosso encarregado (DPO) em{" "}
        <a href="mailto:privacidade@adila.co">privacidade@adila.co</a>.
      </p>
    </LegalPage>
  );
}
